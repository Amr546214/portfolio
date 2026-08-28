/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        os: {
          bg: '#0a0a0b',
          panel: 'rgba(20,20,22,0.72)',
          border: 'rgba(255,255,255,0.08)',
          borderStrong: 'rgba(255,255,255,0.14)',
          text: '#e7e7ea',
          muted: '#8a8a92',
          gold: '#c9a86a',
          goldDeep: '#8f7742',
          accent: '#c9a86a',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        window: '0 30px 80px -20px rgba(0,0,0,0.7), 0 8px 30px -10px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)',
        dock: '0 20px 40px -10px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)',
        icon: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 6px 14px -4px rgba(0,0,0,0.55)',
      },
      keyframes: {
        blink: { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        blink: 'blink 1.1s steps(2,end) infinite',
        floaty: 'floaty 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}

