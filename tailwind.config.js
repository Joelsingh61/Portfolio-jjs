/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--bg-main)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        surface: {
          DEFAULT: "var(--surface-card)",
          hover: "var(--surface-card-hover)",
          border: "var(--surface-border)",
          muted: "var(--surface-muted)"
        },
        accent: {
          DEFAULT: "var(--accent-main)",
          glow: "var(--accent-glow)",
          hover: "var(--accent-hover)"
        },
        brand: {
          emerald: "#10b981",
          green: "#22c55e",
          teal: "#14b8a6",
          lime: "#84cc16"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'warm': 'var(--card-shadow)',
        'warm-hover': 'var(--card-shadow-hover)',
        'neon-green': '0 0 20px rgba(16, 185, 129, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'subtle-float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
