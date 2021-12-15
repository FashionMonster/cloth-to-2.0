module.exports = {
  purge: ['./pages/**/*.ts', './pages/**/*.tsx', './pages/**/*.js'],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#F8E8FD',
          200: '#EABBF9',
          300: '#DA7FF5',
          400: '#BC34E5',
          500: '#B630E0',
          600: '#AE3ED0',
          700: '#8E008E',
          800: '#6D006D',
        },
      },
      borderColor: {
        purple: {
          100: '#F8E8FD',
          200: '#EABBF9',
          300: '#DA7FF5',
          400: '#BC34E5',
          500: '#B630E0',
          600: '#AE3ED0',
          700: '#8E008E',
          800: '#6D006D',
        },
      },
      width: {
        100: '100px',
        112: '112px',
        120: '120px',
        200: '200px',
        220: '220px',
        224: '224px',
        266: '266px',
        270: '270px',
        280: '280px',
        400: '400px',
        408: '408px',
        432: '432px',
        480: '480px',
        490: '490px',
        720: '720px',
        800: '800px',
        1080: '1080px',
      },
      height: {
        100: '100px',
        112: '112px',
        140: '140px',
        200: '200px',
        220: '220px',
        480: '480px',
        490: '490px',
      },
      gridTemplateRows: {
        layout: '64px 48px 1fr 48px',
        index: '64px auto 48px',
        indexMain: 'repeat(4, auto)',
        fileUpload: '480px 112px 32px',
        contributeForm: '32px 32px 32px 32px 32px 32px 32px 32px 32px 112px 32px',
        search: '32px auto 28px',
        auto3x: 'auto auto auto',
        error: '64px auto 48px',
        // form: 'auto 1fr auto',
        form: 'repeat(3, auto)',
        fr3: 'repeat(3, 1fr)',
      },
      gridTemplateColumns: {
        askOfTopPage: '800px 216px',
        contributeForm: '100px 408px',
        previewSubArea: '112px 112px 112px 112px',
        settingForm: '150px 350px',
        searchForm: '120px 280px 80px',
        inputComposition: '120px 80px 64px',
        inputUnitPrice: '192px 72px',
        auto3x: 'auto auto auto',
        nav: 'auto 1fr auto',
        fr3: 'repeat(3, 1fr)',
      },
      lineHeight: {
        12: '3rem',
        16: '4rem',
      },
    },
    screens: {
      max_2xl: { max: '1536px' },
      // => @media (max-width: 1536px) { ... }
      max_xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }
      max_lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }
      max_sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
      min_2xl: '1536px',
      // => @media (min-width: 1536px) { ... }
      min_xl: '1279px',
      // => @media (min-width: 1279px) { ... }
      min_lg: '1023px',
      // => @media (min-width: 1023px) { ... }
      min_sm: '639px',
      // => @media (min-width: 639px) { ... }
    },
  },
  variants: {
    extend: {
      textColor: ['disabled'],
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
      opacity: ['disabled'],
    },
    visibility: ['group-hover'],
  },
  plugins: [],
};
