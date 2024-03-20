export const SPACING = {
  '3XS': '0.125rem',
  '2XS': '0.25rem',
  XS: '0.5rem',
  S: '0.75rem',
  M: '1rem',
  L: '1.5rem',
  XL: '2rem',
  '2XL': '3rem',
  '3XL': '4rem',
  '4XL': '6rem'
};

export const BREAKPOINTS = {
  SMALLSCREEN: 320,
  LARGESCREEN: 641,
  XLSCREEN: 820
};

export const MEDIA_QUERIES = {
  LARGESCREEN: `@media only screen and (min-width: ${BREAKPOINTS.LARGESCREEN}px)`,
  XLSCREEN: `@media only screen and (min-width: ${BREAKPOINTS.XLSCREEN}px)`,
  PRINT: '@media print'
};

/*
  Inspired by GitHub color system
  https://styleguide.github.com/primer/support/color-system/
*/
export const COLORS = {
  maize: {
    100: '#FFF9E6',
    200: '#FFEA9B',
    300: '#FFDA50',
    400: '#FFCB05',
    500: '#EABA02'
  },
  blue: {
    100: '#F7F8F9',
    200: '#B2BEC9',
    300: '#4C6781',
    400: '#00274C',
    500: '#001324'
  },
  neutral: {
    100: '#E5E9ED',
    200: '#8A96A1',
    300: '#637381',
    400: '#212B36',
    500: '#06080A'
  },
  teal: {
    100: '#E9F2F5',
    200: '#A7CDDB',
    300: '#65A8BF',
    400: '#126DC1',
    500: '#106684'
  },
  orange: {
    100: '#FFF1EB',
    200: '#FFB899',
    300: '#FF8A58',
    400: '#F25F1F',
    500: '#C74E1A'
  },
  pink: {
    100: '#FCEBEB',
    200: '#F29D9D',
    300: '#EC6969',
    400: '#D93838',
    500: '#BF3232'
  },
  indigo: {
    100: '#EEF1F9',
    200: '#AAB9E3',
    300: '#7C93D4',
    400: '#506FC5',
    500: '#274391'
  },
  green: {
    100: '#EAF8EE',
    200: '#96DBAA',
    300: '#57BC75',
    400: '#20A848',
    500: '#198539'
  }
};

export const SEARCH_COLORS = {
  grey: {
    600: '#262626',
    500: '#4E4E4E',
    400: '#CCC',
    200: '#F2F2F2',
    100: '#FAFAFA'
  },
  blue: {
    500: '#126DC1',
    400: '#CCE6FF',
    300: '#E6F3FF'
  },
  green: {
    600: '#057C42'
  },
  orange: {
    600: '#AA5600'
  },
  red: {
    600: '#C53B26'
  }
};

export const INTENT_COLORS = {
  informational: SEARCH_COLORS.blue[400],
  success: SEARCH_COLORS.green[600],
  warning: SEARCH_COLORS.orange[600],
  error: SEARCH_COLORS.red[600]
};
