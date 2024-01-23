const plugin = require("tailwindcss")
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      title: ["Geist", ...defaultTheme.fontFamily.sans],
      sans: ["Geist", ...defaultTheme.fontFamily.sans],
      mono: [
        '"Geist Mono"', 'Menlo', 'Monaco', 'Lucida Console', 'Liberation Mono',
        'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', 'monospace',
      ],
    },
  },
  plugins: [
    plugin(({ addComponents, addVariant }) => {
      addComponents({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          }
        }
      })
      addVariant('all', '&, *')
      addVariant('all-children', '& *')
    })
  ],
};
