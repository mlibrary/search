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
