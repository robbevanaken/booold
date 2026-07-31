import { createHmac, timingSafeEqual } from 'node:crypto'
import {
  defineEventHandler,
  getCookie,
  setCookie,
  setHeader,
  setResponseStatus,
  readBody,
  sendRedirect,
  createError,
} from 'h3'

const SECRET = process.env.NUXT_DESIGN_SECRET || 'booold-designs-2026'
const SLUG_RE = /^[a-z0-9_-]+$/i

interface ClientConfig {
  name?: string
  password: string
}

function sign(client: string, password: string): string {
  return createHmac('sha256', SECRET).update(`${client}:${password}`).digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  return ba.length === bb.length && timingSafeEqual(ba, bb)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function prettyName(file: string): string {
  return file
    .replace(/\.html$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

const LOGO_MIME: Record<string, string> = {
  svg: 'image/svg+xml',
  png: 'image/png',
  webp: 'image/webp',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
}

async function getLogoDataUri(
  storage: ReturnType<typeof useStorage>,
  client: string
): Promise<string | null> {
  for (const [ext, mime] of Object.entries(LOGO_MIME)) {
    const raw = await storage.getItemRaw(`designs/${client}/logo.${ext}`)
    if (raw) {
      const buf = Buffer.isBuffer(raw) ? raw : Buffer.from(raw as any)
      return `data:${mime};base64,${buf.toString('base64')}`
    }
  }
  return null
}

const STAR_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Cpath d='M17.5151 8.30349C18.1616 8.54274 18.1616 9.45726 17.5151 9.69651L12.1285 11.6897C11.9252 11.7649 11.7649 11.9252 11.6897 12.1285L9.69651 17.5151C9.45725 18.1616 8.54274 18.1616 8.30349 17.5151L6.31028 12.1285C6.23506 11.9252 6.07478 11.7649 5.8715 11.6897L0.484933 9.69651C-0.161646 9.45725 -0.161644 8.54274 0.484937 8.30349L5.8715 6.31028C6.07478 6.23506 6.23506 6.07478 6.31028 5.8715L8.30349 0.484934C8.54274 -0.161647 9.45726 -0.161644 9.69651 0.484936L11.6897 5.8715C11.7649 6.07478 11.9252 6.23506 12.1285 6.31028L17.5151 8.30349Z'/%3E%3C/svg%3E")`

function page(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>${escapeHtml(title)} — Booold Studio</title>
  <link rel="icon" href="/favicon.ico">
  <link rel="preload" href="/fonts/Inter-VariableFont.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/DarkParadise-Italic.woff2" as="font" type="font/woff2" crossorigin>
  <style>
    @font-face {
      font-family: 'Inter';
      src: url('/fonts/Inter-VariableFont.woff2') format('woff2');
      font-weight: 100 900;
      font-display: swap;
    }
    @font-face {
      font-family: 'Dark Paradise';
      src: url('/fonts/DarkParadise-Italic.woff2') format('woff2');
      font-weight: 400;
      font-display: swap;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    ::selection { background: #FF4D00; color: #F4F4F4; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0F0F0F;
      color: #F4F4F4;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      letter-spacing: -0.04em;
      padding: 24px;
    }
    .card { width: 100%; max-width: 460px; }
    .label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: clamp(10px, 1vw, 12px);
      color: rgba(244, 244, 244, 0.5);
      margin-bottom: 28px;
    }
    .label::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: #CCFF33;
    }
    h1 {
      font-size: clamp(40px, 5vw, 64px);
      line-height: 1.15;
      font-weight: 500;
      letter-spacing: -0.04em;
      margin-bottom: 16px;
    }
    .fancy {
      font-family: 'Dark Paradise', serif;
      font-style: italic;
      font-weight: 400;
      font-size: 1.25em;
      letter-spacing: normal;
      line-height: 1.15;
    }
    .logo-chip {
      display: inline-block;
      background: #F4F4F4;
      border-radius: 6px;
      padding: 24px 30px;
      margin-bottom: 28px;
      max-width: 100%;
    }
    .logo-chip img { display: block; height: 56px; width: auto; max-width: 100%; object-fit: contain; }
    .sub {
      font-size: clamp(14px, 1.5vw, 16px);
      line-height: 1.5;
      color: rgba(244, 244, 244, 0.5);
      margin-bottom: 40px;
      max-width: 38ch;
    }
    form { display: flex; gap: 10px; flex-wrap: wrap; }
    input[type="password"] {
      flex: 1;
      min-width: 180px;
      background: rgba(244, 244, 244, 0.06);
      border: 1px solid rgba(244, 244, 244, 0.2);
      border-radius: 999px;
      color: #F4F4F4;
      font-family: inherit;
      font-weight: 500;
      letter-spacing: -0.04em;
      font-size: clamp(14px, 1.5vw, 16px);
      padding: 16px 28px;
      outline: none;
      transition: border-color 0.3s ease;
    }
    input[type="password"]::placeholder { color: rgba(244, 244, 244, 0.4); }
    input[type="password"]:focus { border-color: rgba(244, 244, 244, 0.6); }
    button {
      background: #FF4D00;
      color: #F4F4F4;
      border: 0;
      border-radius: 999px;
      font-family: inherit;
      font-weight: 500;
      letter-spacing: -0.04em;
      font-size: clamp(14px, 1.5vw, 16px);
      padding: 16px 28px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.5);
    }
    button:hover { transform: scale(1.05); background: rgba(255, 77, 0, 0.85); }
    .error { color: #FF4D00; font-size: clamp(14px, 1.5vw, 16px); margin-top: 18px; }
    ul { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-top: 40px; }
    ul a {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid rgba(244, 244, 244, 0.2);
      border-radius: 999px;
      color: #F4F4F4;
      text-decoration: none;
      font-size: clamp(16px, 1.55vw, 22px);
      padding: 20px 32px;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.5);
    }
    ul a .star {
      position: absolute;
      left: 12px;
      top: 50%;
      width: 12px;
      height: 12px;
      transform: translateY(-50%) scale(0) rotate(180deg);
      opacity: 0;
      background: #FF4D00;
      mask-image: ${STAR_MASK};
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;
      -webkit-mask-image: ${STAR_MASK};
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      -webkit-mask-size: contain;
      transition: all 0.3s ease;
    }
    ul a::after { content: '→'; color: rgba(244, 244, 244, 0.5); transition: color 0.3s ease; }
    ul a:hover { border-color: #FF4D00; padding-left: 40px; }
    ul a:hover .star { opacity: 1; transform: translateY(-50%) scale(1) rotate(0deg); }
    ul a:hover::after { color: #FF4D00; }
    .footer {
      margin-top: 48px;
      font-size: clamp(10px, 1vw, 12px);
      color: rgba(244, 244, 244, 0.3);
    }
  </style>
</head>
<body>
  <main class="card">
    <p class="label">Booold Studio — Client preview</p>
    ${body}
    <p class="footer">© Booold Studio. Shared in confidence — please don't distribute.</p>
  </main>
</body>
</html>`
}

function heading(clientName: string, logo: string | null): string {
  if (logo) {
    return `<div class="logo-chip"><img src="${logo}" alt="${escapeHtml(clientName)}"></div>`
  }
  return `<h1>Designs for <span class="fancy">${escapeHtml(clientName)}</span></h1>`
}

function passwordPage(clientName: string, logo: string | null, error = false): string {
  return page(
    clientName,
    `${heading(clientName, logo)}
    <p class="sub">This preview is password protected. Enter the password you received to view the designs.</p>
    <form method="post">
      <input type="password" name="password" placeholder="Password" autofocus required>
      <button type="submit">View designs</button>
    </form>
    ${error ? '<p class="error">Incorrect password, please try again.</p>' : ''}`
  )
}

export default defineEventHandler(async (event) => {
  // Keep every page under /designs out of search engines
  setHeader(event, 'X-Robots-Tag', 'noindex, nofollow')

  const slug = event.context.params?.slug || ''
  const parts = slug.split('/').filter(Boolean)
  const [client, ...rest] = parts

  if (!client || !SLUG_RE.test(client)) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const storage = useStorage('assets:server')
  const config = (await storage.getItem(`designs/${client}/config.json`)) as ClientConfig | null

  if (!config?.password) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const clientName = config.name || prettyName(client)
  const cookieName = `booold_design_${client}`
  const expected = sign(client, config.password)
  const authed = safeEqual(getCookie(event, cookieName) || '', expected)

  // Password submit
  if (event.method === 'POST') {
    const body = await readBody<{ password?: string }>(event)
    if (typeof body?.password === 'string' && safeEqual(body.password, config.password)) {
      setCookie(event, cookieName, expected, {
        httpOnly: true,
        sameSite: 'lax',
        secure: !import.meta.dev,
        path: `/designs/${client}`,
        maxAge: 60 * 60 * 24 * 30,
      })
      return sendRedirect(event, `/designs/${client}`, 303)
    }
    setResponseStatus(event, 401)
    setHeader(event, 'Content-Type', 'text/html; charset=utf-8')
    return passwordPage(clientName, await getLogoDataUri(storage, client), true)
  }

  if (event.method !== 'GET' && event.method !== 'HEAD') {
    throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
  }

  if (!authed) {
    if (rest.length) {
      return sendRedirect(event, `/designs/${client}`, 302)
    }
    setHeader(event, 'Content-Type', 'text/html; charset=utf-8')
    return passwordPage(clientName, await getLogoDataUri(storage, client))
  }

  // Serve an individual design file
  if (rest.length) {
    const file = rest.join('/').replace(/\.html$/, '')
    if (!SLUG_RE.test(file)) {
      throw createError({ statusCode: 404, statusMessage: 'Not found' })
    }
    const html = await storage.getItemRaw(`designs/${client}/${file}.html`)
    if (!html) {
      throw createError({ statusCode: 404, statusMessage: 'Not found' })
    }
    setHeader(event, 'Content-Type', 'text/html; charset=utf-8')
    setHeader(event, 'Cache-Control', 'private, no-store')
    return html
  }

  // Overview of this client's designs
  const keys = await storage.getKeys(`designs/${client}`)
  const files = keys
    .map((k) => k.split(/[:/]/).pop() || '')
    .filter((f) => f.endsWith('.html'))
    .sort()

  const list = files
    .map((f) => {
      const slugName = f.replace(/\.html$/, '')
      return `<li><a href="/designs/${client}/${slugName}"><span class="star"></span>${escapeHtml(prettyName(f))}</a></li>`
    })
    .join('\n      ')

  setHeader(event, 'Content-Type', 'text/html; charset=utf-8')
  setHeader(event, 'Cache-Control', 'private, no-store')
  return page(
    clientName,
    `${heading(clientName, await getLogoDataUri(storage, client))}
    <p class="sub">Pick a design below to open the interactive preview.</p>
    <ul>${list}</ul>`
  )
})
