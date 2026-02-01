// WebGL2 renderer for Unicorn Studio gradient effects
import { gradientData } from './gradientData'

interface Layer {
  visible: boolean
  layerType: string
  type: string
  speed?: number
  trackMouse?: number
  mouseMomentum?: number
  animating?: boolean
  compiledFragmentShaders: string[]
  compiledVertexShaders: string[]
  data: {
    isBackground?: boolean
    downSample?: number
  }
  id: string
}

interface ShaderProgram {
  program: WebGLProgram
  attribLocations: {
    vertexPosition: number
    textureCoord: number
  }
  uniformLocations: {
    pMatrix: WebGLUniformLocation | null
    mvMatrix: WebGLUniformLocation | null
    textureMatrix: WebGLUniformLocation | null
    texture: WebGLUniformLocation | null
    time: WebGLUniformLocation | null
    mousePos: WebGLUniformLocation | null
    resolution: WebGLUniformLocation | null
  }
}

export class GradientRenderer {
  private canvas: HTMLCanvasElement
  private gl: WebGL2RenderingContext | null = null
  private layers: Layer[]
  private programs: ShaderProgram[] = []
  private quadBuffer: WebGLBuffer | null = null
  private texCoordBuffer: WebGLBuffer | null = null
  private framebuffers: WebGLFramebuffer[] = []
  private textures: WebGLTexture[] = []
  private animationId: number = 0
  private startTime: number = 0
  private mousePos = { x: 0.5, y: 0.5 }
  private targetMousePos = { x: 0.5, y: 0.5 }
  private dpi: number
  private isDestroyed = false

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.layers = gradientData.history.filter(l => l.visible) as Layer[]
    this.dpi = Math.min(gradientData.options.dpi || 1.5, window.devicePixelRatio)
  }

  init(): boolean {
    const gl = this.canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false
    })

    if (!gl) {
      console.error('WebGL2 not supported')
      return false
    }

    this.gl = gl
    this.startTime = performance.now()

    this.setupBuffers()
    this.compileShaders()
    this.resize()
    this.setupMouseTracking()
    this.render()

    window.addEventListener('resize', this.handleResize)

    return true
  }

  private setupBuffers(): void {
    const gl = this.gl!

    // Fullscreen quad vertices
    const positions = new Float32Array([
      -1, -1, 0,
       1, -1, 0,
      -1,  1, 0,
       1,  1, 0
    ])

    const texCoords = new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      1, 1
    ])

    this.quadBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    this.texCoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW)
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    const gl = this.gl!
    const shader = gl.createShader(type)
    if (!shader) return null

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  private compileShaders(): void {
    const gl = this.gl!

    for (const layer of this.layers) {
      const vertexShader = this.compileShader(
        gl.VERTEX_SHADER,
        layer.compiledVertexShaders[0]
      )
      const fragmentShader = this.compileShader(
        gl.FRAGMENT_SHADER,
        layer.compiledFragmentShaders[0]
      )

      if (!vertexShader || !fragmentShader) {
        console.error(`Failed to compile shaders for layer: ${layer.id}`)
        continue
      }

      const program = gl.createProgram()!
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program))
        continue
      }

      this.programs.push({
        program,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
          textureCoord: gl.getAttribLocation(program, 'aTextureCoord')
        },
        uniformLocations: {
          pMatrix: gl.getUniformLocation(program, 'uPMatrix'),
          mvMatrix: gl.getUniformLocation(program, 'uMVMatrix'),
          textureMatrix: gl.getUniformLocation(program, 'uTextureMatrix'),
          texture: gl.getUniformLocation(program, 'uTexture'),
          time: gl.getUniformLocation(program, 'uTime'),
          mousePos: gl.getUniformLocation(program, 'uMousePos'),
          resolution: gl.getUniformLocation(program, 'uResolution')
        }
      })

      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }

  private createFramebuffer(width: number, height: number): { fb: WebGLFramebuffer, tex: WebGLTexture } {
    const gl = this.gl!

    const texture = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    const framebuffer = gl.createFramebuffer()!
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    return { fb: framebuffer, tex: texture }
  }

  private resize = (): void => {
    const gl = this.gl!
    const rect = this.canvas.getBoundingClientRect()
    const width = Math.floor(rect.width * this.dpi)
    const height = Math.floor(rect.height * this.dpi)

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width
      this.canvas.height = height

      // Cleanup old framebuffers
      for (const fb of this.framebuffers) {
        gl.deleteFramebuffer(fb)
      }
      for (const tex of this.textures) {
        gl.deleteTexture(tex)
      }
      this.framebuffers = []
      this.textures = []

      // Create ping-pong framebuffers
      for (let i = 0; i < 2; i++) {
        const { fb, tex } = this.createFramebuffer(width, height)
        this.framebuffers.push(fb)
        this.textures.push(tex)
      }
    }
  }

  private handleResize = (): void => {
    this.resize()
  }

  private setupMouseTracking(): void {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect()
      this.targetMousePos.x = (e.clientX - rect.left) / rect.width
      this.targetMousePos.y = 1 - (e.clientY - rect.top) / rect.height
    }

    const handleMouseLeave = () => {
      this.targetMousePos.x = 0.5
      this.targetMousePos.y = 0.5
    }

    this.canvas.addEventListener('mousemove', handleMouseMove)
    this.canvas.addEventListener('mouseleave', handleMouseLeave)
  }

  private render = (): void => {
    if (this.isDestroyed) return

    const gl = this.gl!
    const time = (performance.now() - this.startTime) / 1000

    // Smooth mouse position with momentum
    const smoothing = 0.08
    this.mousePos.x += (this.targetMousePos.x - this.mousePos.x) * smoothing
    this.mousePos.y += (this.targetMousePos.y - this.mousePos.y) * smoothing

    gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    // Identity matrices for fullscreen quad
    const identityMatrix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ])

    let readIndex = 0
    let writeIndex = 1

    for (let i = 0; i < this.programs.length; i++) {
      const program = this.programs[i]
      const layer = this.layers[i]
      const isLastLayer = i === this.programs.length - 1

      // Render to framebuffer or screen
      if (isLastLayer) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[writeIndex])
      }

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program.program)

      // Set up vertex attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer)
      gl.enableVertexAttribArray(program.attribLocations.vertexPosition)
      gl.vertexAttribPointer(program.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0)

      gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer)
      gl.enableVertexAttribArray(program.attribLocations.textureCoord)
      gl.vertexAttribPointer(program.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0)

      // Set uniforms
      if (program.uniformLocations.pMatrix) {
        gl.uniformMatrix4fv(program.uniformLocations.pMatrix, false, identityMatrix)
      }
      if (program.uniformLocations.mvMatrix) {
        gl.uniformMatrix4fv(program.uniformLocations.mvMatrix, false, identityMatrix)
      }
      if (program.uniformLocations.textureMatrix) {
        gl.uniformMatrix4fv(program.uniformLocations.textureMatrix, false, identityMatrix)
      }
      if (program.uniformLocations.time) {
        gl.uniform1f(program.uniformLocations.time, time * (layer.speed || 1))
      }
      if (program.uniformLocations.mousePos) {
        gl.uniform2f(program.uniformLocations.mousePos, this.mousePos.x, this.mousePos.y)
      }
      if (program.uniformLocations.resolution) {
        gl.uniform2f(program.uniformLocations.resolution, this.canvas.width, this.canvas.height)
      }

      // Bind previous render as texture (for non-background layers)
      if (!layer.data.isBackground && i > 0) {
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, this.textures[readIndex])
        if (program.uniformLocations.texture) {
          gl.uniform1i(program.uniformLocations.texture, 0)
        }
      }

      // Draw fullscreen quad
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // Swap ping-pong buffers
      if (!isLastLayer) {
        const temp = readIndex
        readIndex = writeIndex
        writeIndex = temp
      }
    }

    this.animationId = requestAnimationFrame(this.render)
  }

  destroy(): void {
    this.isDestroyed = true
    cancelAnimationFrame(this.animationId)
    window.removeEventListener('resize', this.handleResize)

    if (this.gl) {
      for (const program of this.programs) {
        this.gl.deleteProgram(program.program)
      }
      for (const fb of this.framebuffers) {
        this.gl.deleteFramebuffer(fb)
      }
      for (const tex of this.textures) {
        this.gl.deleteTexture(tex)
      }
      if (this.quadBuffer) {
        this.gl.deleteBuffer(this.quadBuffer)
      }
      if (this.texCoordBuffer) {
        this.gl.deleteBuffer(this.texCoordBuffer)
      }
    }
  }
}
