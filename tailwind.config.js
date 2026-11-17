// Colors are the exact values read from the Figma frames.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
      colors: {
        page: '#f9f7f9', ink: '#29252d', ink2: '#3a363d', body: '#59535e',
        mute: '#6e6873', faint: '#77717c', brand: '#604968', tint: '#f0ebf2',
        tint2: '#f6f3f8', line: '#e5e0e8', chip: '#e2dce6', btn: '#d5cedb',
        decline: '#524e57', check: '#c9c0ce',
      },
    },
  },
  plugins: [],
}
