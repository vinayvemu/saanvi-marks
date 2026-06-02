/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdfaf0',
          100: '#faf0c8',
          200: '#f5dc8a',
          300: '#efc24a',
          400: '#e8a81a',
          500: '#c98b0a',
          600: '#a06c06',
          700: '#7a5008',
          800: '#64400a',
          900: '#4a2e0b',
        },
        onyx: {
          50:  '#f5f5f4',
          100: '#e8e6e3',
          200: '#d0cdc8',
          300: '#c8c3bc',
          400: '#b0aba3',   /* was #8a847a — bumped for dark-bg legibility */
          500: '#8a847a',   /* was #6e6860 */
          600: '#6e6860',   /* was #575249 */
          700: '#46423b',
          800: '#3a3731',
          900: '#1a1917',
          950: '#0e0d0c',
        },
        cream: '#faf8f3',
      },
      fontFamily: {
        serif:   ['"Comfortaa"', 'cursive'],
        display: ['"Comfortaa"', 'cursive'],
        script:  ['"Caveat"', 'cursive'],
        sans:    ['"Nunito"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        luxury: '0.2em',
        wide:   '0.12em',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'shimmer':    'shimmer 2s infinite',
        'float':      'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:  { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
}
