module.exports = {
    content: ['./*.html'],
    theme: {
      extend: {
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          slideInUp: {
            '0%': { transform: 'translateY(20px)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
        },
        animation: {
          fadeIn: 'fadeIn 1.5s ease-out',
          slideInUp: 'slideInUp 1s ease-out',
        },
      },
    },
    plugins: [],
  }
  