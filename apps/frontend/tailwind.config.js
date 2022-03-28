module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sulphur Point', 'sans-serif'],
        logo: ['Reem Kufi', 'sans-serif'],
      },
      colors: {
        black: '#101F39',
        white: {
          DEFAULT: '#F9F9F9',
          transparant: {
            '19': '#FFFFFF30',
            '26': '#FFFFFF42'
          }
        },
        yellow: '#FFE922',
        blue: {
          DEFAULT: '#234580',
          dark: {
            DEFAULT: '#162B4F',
            lighter: '#172E55'
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
