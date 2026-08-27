/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Light mode semantic tokens (driven by CSS variables)
        bg: {
          primary: 'rgb(var(--bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
          surface: 'rgb(var(--bg-surface) / <alpha-value>)',
          placeholder: 'rgb(var(--bg-placeholder) / <alpha-value>)',
        },
        ink: {
          primary: 'rgb(var(--ink-primary) / <alpha-value>)',
          secondary: 'rgb(var(--ink-secondary) / <alpha-value>)',
        },
        accent: 'rgb(var(--accent) / <alpha-value>)',
        border: {
          DEFAULT: 'rgb(var(--border-color) / <alpha-value>)',
          soft: 'rgb(var(--border-soft) / <alpha-value>)',
        },
        badge: {
          eco: 'rgb(var(--badge-eco) / <alpha-value>)',
          ecoText: 'rgb(var(--badge-eco-text) / <alpha-value>)',
          origin: 'rgb(var(--badge-origin) / <alpha-value>)',
          originText: 'rgb(var(--badge-origin-text) / <alpha-value>)',
        },
        star: 'rgb(var(--star) / <alpha-value>)',
      },
      borderRadius: {
        card: '10px',
        btn: '6px',
      },
      boxShadow: {
        soft: '0 1px 3px 0 rgba(61, 49, 32, 0.06), 0 1px 2px 0 rgba(61, 49, 32, 0.04)',
        card: '0 2px 8px -2px rgba(61, 49, 32, 0.08)',
        lift: '0 8px 24px -6px rgba(61, 49, 32, 0.12)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.25s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
};
