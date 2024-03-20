export const SPACING = {
  '2XS': '0.25rem',
  XS: '0.5rem',
  S: '0.75rem',
  M: '1rem'
};

export const BREAKPOINTS = {
  LARGESCREEN: 641,
  XLSCREEN: 820
};

export const MEDIA_QUERIES = {
  LARGESCREEN: `@media only screen and (min-width: ${BREAKPOINTS.LARGESCREEN}px)`,
  XLSCREEN: `@media only screen and (min-width: ${BREAKPOINTS.XLSCREEN}px)`
};

/*
  Inspired by GitHub color system
  https://styleguide.github.com/primer/support/color-system/
*/
export const COLORS = {
  maize: {
    400: '#FFCB05',
    500: '#EABA02'
  },
  blue: {
    100: '#F7F8F9',
    300: '#4C6781'
  },
  neutral: {
    100: '#E5E9ED',
    300: '#637381',
    400: '#212B36'
  },
  green: {
    100: '#EAF8EE',
    200: '#96DBAA',
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
