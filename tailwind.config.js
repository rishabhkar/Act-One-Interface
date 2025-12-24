/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        stage: {
          950: '#06070a',
          900: '#0a0b10',
          800: '#0d1220',
        },
        ember: {
          300: '#ffb37a',
          400: '#ff8a3d',
          500: '#ff6a1a',
        },
        midnight: {
          500: '#1c2b5a',
          600: '#142047',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.55)',
        ember: '0 0 0 1px rgba(255, 122, 59, 0.22), 0 22px 60px rgba(0,0,0,0.6)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-30%) rotate(8deg)', opacity: '0' },
          '20%': { opacity: '0.35' },
          '50%': { opacity: '0.12' },
          '100%': { transform: 'translateX(130%) rotate(8deg)', opacity: '0' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1.05)' },
          '100%': { transform: 'translate3d(-6%, -2%, 0) scale(1.05)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        sweep: 'sweep 10s ease-in-out infinite',
        drift: 'drift 45s linear infinite',
      },
    },
  },
  plugins: [],
}
