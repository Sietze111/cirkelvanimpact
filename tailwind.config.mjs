/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F8F2E8',
          200: '#F0E6D6',
          300: '#E6D8C3'
        },
        sand: {
          200: '#EADCC8',
          300: '#DCC9AE',
          400: '#CBB48F'
        },
        ink: {
          900: '#1C2421',
          800: '#27312C',
          700: '#3A443F',
          600: '#4E5953',
          500: '#66706A',
          400: '#8A938D'
        },
        coral: {
          50: '#FDF0EB',
          100: '#FBE0D6',
          300: '#F29B7F',
          500: '#E4572E',
          700: '#C94524',
          800: '#A93A1E'
        },
        petrol: {
          50: '#EEF5F3',
          700: '#17504F',
          800: '#123F3E',
          900: '#0F3B3B'
        },
        sage: {
          100: '#E8EEE4',
          300: '#B7C9B0',
          600: '#4F6B52'
        }
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        book: '0 35px 70px -30px rgba(28, 36, 33, 0.45)',
        soft: '0 20px 50px -30px rgba(28, 36, 33, 0.32)',
        card: '0 12px 35px -24px rgba(28, 36, 33, 0.35)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both'
      }
    }
  },
  plugins: []
}
