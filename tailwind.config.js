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
      fontFamily: {},
      fontSize: {
        "xs": ["clamp(10px, 1vw, 12px)", 1],
        "base": ["clamp(14px, 1.5vw, 20px)", 1.5],
        "md": ["clamp(16px, 1.55vw, 22px)", 1.5],
        "lg": ["clamp(24px, 2.5vw, 32px)", 1.7],
        "xl": ["clamp(28px, 3vw, 56px)", 1.25],
        "xxl": ["clamp(40px, 6vw, 94px)", 1.15],
        },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}