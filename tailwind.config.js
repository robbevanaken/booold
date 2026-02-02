module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        black: '#0F0F0F',
        white: '#F4F4F4',
        orange: '#FF4D00',
        green: '#CCFF33',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'dark-paradise': ['Dark Paradise', 'serif'],
      },
      fontSize: {
        "xs": ["clamp(10px, 1vw, 12px)", 1],
        "base": ["clamp(14px, 1.5vw, 16px)", 1.5],
        "md": ["clamp(16px, 1.55vw, 22px)", 1.5],
        "md-sec": ["clamp(18px, 1.55vw, 24px)", 1.5],
        "cta": ["clamp(32px, 3vw, 40px)", 1.7],
        "lg": ["clamp(28px, 2.5vw, 72px)", 1.7],
        "lg-scaleup": ["clamp(32px, 3vw, 78px)", 1.7],
        "xl": ["clamp(28px, 3vw, 56px)", 1.25],
        "xxl": ["clamp(40px, 5vw, 64px)", 1.15],
        "xxxl": ["clamp(64px, 6vw, 94px)", 1.15],
      },
      letterSpacing: {
        "tight": '-0.04em',  // -4%
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.27, 1.5)'
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
}