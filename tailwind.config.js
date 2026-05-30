
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: {
          DEFAULT: '#0a0a0f',
          100: '#13131a',
          200: '#1c1c26',
          300: '#2a2a35',
        },
        accent: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          glow: 'rgba(59, 130, 246, 0.5)',
        },
        warning: '#f59e0b',
        muscle: {
          green: '#10b981', // balanced
          yellow: '#f59e0b', // undertrained
          red: '#ef4444', // imbalanced/neglected
          overtrained: '#8b5cf6', // purple for overtrained
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-strong': '0 0 30px rgba(59, 130, 246, 0.3)',
      }
    },
  },
  plugins: [],
}
