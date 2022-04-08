import React from "react";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";

export const SPACING = {
  "3XS": "0.125rem",
  "2XS": "0.25rem",
  XS: "0.5rem",
  S: "0.75rem",
  M: "1rem",
  L: "1.5rem",
  XL: "2rem",
  "2XL": "3rem",
  "3XL": "4rem",
  "4XL": "6rem"
};

export const BREAKPOINTS = {
  SMALLSCREEN: 320,
  LARGESCREEN: 641
};

export const MEDIA_QUERIES = {
  LARGESCREEN: `@media only screen and (min-width: ${BREAKPOINTS.LARGESCREEN}px)`,
  PRINT: "@media print"
};

const TYPE_2XL = {
  fontSize: "2.25rem",
  fontFamily: "Crimson Text",
  lineHeight: "1.25"
};

export const Z_SPACE = {
  8: {
    boxShadow: `0 2px 8px 0 rgba(0,0,0,0.2)`
  },
  16: {
    boxShadow: `0 4px 16px 0 rgba(0,0,0,0.12)`
  }
};

export const TYPOGRAPHY = {
  "3XL": {
    ...TYPE_2XL,
    [MEDIA_QUERIES.LARGESCREEN]: {
      fontSize: "3.5rem",
      fontFamily: "Crimson Text",
      lineHeight: "1.125"
    }
  },
  "2XL": TYPE_2XL,
  XL: {
    fontSize: "2rem",
    fontWeight: "800",
    lineHeight: "1.25"
  },
  L: {
    fontSize: "1.75rem",
    fontWeight: "600",
    lineHeight: "1.25"
  },
  M: {
    fontSize: "1.5rem",
    fontWeight: "600",
    lineHeight: "1.25"
  },
  S: {
    fontSize: "1.25rem",
    fontWeight: "600"
  },
  XS: {
    fontSize: "1.125rem"
  },
  "2XS": {
    fontSize: "1rem"
  },
  "3XS": {
    fontSize: "0.875rem",
    fontWeight: "800",
    letterSpacing: "1.25px",
    textTransform: "uppercase"
  }
};

/*
  Inspired by GitHub color system
  https://styleguide.github.com/primer/support/color-system/
*/
export const COLORS = {
  maize: {
    "100": "#FFF9E6",
    "200": "#FFEA9B",
    "300": "#FFDA50",
    "400": "#FFCB05",
    "500": "#EABA02"
  },
  blue: {
    "100": "#F7F8F9",
    "200": "#B2BEC9",
    "300": "#4C6781",
    "400": "#00274C",
    "500": "#001324"
  },
  neutral: {
    "100": "#E5E9ED",
    "200": "#8A96A1",
    "300": "#637381",
    "400": "#212B36",
    "500": "#06080A"
  },
  teal: {
    "100": "#E9F2F5",
    "200": "#A7CDDB",
    "300": "#65A8BF",
    "400": "#126DC1",
    "500": "#106684"
  },
  orange: {
    "100": "#FFF1EB",
    "200": "#FFB899",
    "300": "#FF8A58",
    "400": "#F25F1F",
    "500": "#C74E1A"
  },
  pink: {
    "100": "#FCEBEB",
    "200": "#F29D9D",
    "300": "#EC6969",
    "400": "#D93838",
    "500": "#BF3232"
  },
  indigo: {
    "100": "#EEF1F9",
    "200": "#AAB9E3",
    "300": "#7C93D4",
    "400": "#506FC5",
    "500": "#274391"
  },
  green: {
    "100": "#EAF8EE",
    "200": "#96DBAA",
    "300": "#57BC75",
    "400": "#20A848",
    "500": "#198539"
  }
};

export const SEARCH_COLORS = {
  brand: {
    maize: '#FFCB05',
    blue: '#00274C'
  },
  grey: {
    '600': '#262626',
    '500': '#4E4E4E',
    '400': '#CCC',
    '300': '#E5E5E5',
    '200': '#F2F2F2',
    '100': '#FAFAFA'
  },
  blue: {
    '700': '#00274C',
    '600': '#0C5292',
    '500': '#126DC1',
    '400': '#CCE6FF',
    '300': '#E6F3FF',
    '200': '#F2F9FF'
  },
  green: {
    '600': '#057C42',
    '500': '#05A657',
    '400': '#E2F4EB'
  },
  orange: {
    '600': '#AA5600',
    '500': '#E77504',
    '400': '#FFEEDD'
  },
  red: {
    '600': '#C53B26',
    '500': '#ED5D47',
    '400': '#FFEAE7'
  },
  teal: {
    '600': '#AA5600',
    '500': '#E77504',
    '400': '#FFEEDD'
  },
  purple: {
    '600': '#4c2c92'
  }
}

export const LINK_COLOR = COLORS.teal[400];

export const FONT_COLOR = COLORS.blue[500];

export const INTENT_COLORS = {
  informational: COLORS.blue[400],
  success: SEARCH_COLORS.green[600],
  warning: COLORS.maize[400],
  error: SEARCH_COLORS.orange[400]
};

export function GlobalStyleSheet() {
  /*
    TODO:
    - [ ] Import global css from a plain css file.
      pros:
        - The CSS file would be available on unpkg as part of the lib/ dir
      cons:
        - Unable to use CSS-in-JS benefits. Such as using values above in the
          the global stylesheet.
        - Need to setup build process to handle this.

      Alternative(s)
        - Maybe this stylesheet could be generated into a traditional stylesheet at build.
          This could be setup as part of the build step in styles/package.json
  */
  const stylesheet = `
    /* 
    CSS Reset
    
    http://meyerweb.com/eric/tools/css/reset/ 
      v2.0 | 20110126
      License: none (public domain)
    */
    
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
      display: block;
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    /*
      Button CSS reset
    */
    button {
      border: none;
      margin: 0;
      padding: 0;
      width: auto;
      overflow: visible;
      background: transparent;

      /* inherit font, color, and line height from ancestor */
      color: inherit;
      font: inherit;
      line-height: inherit;

      /* Corrects font smoothing for webkit */
      -webkit-font-smoothing: inherit;
      -moz-osx-font-smoothing: inherit;

      /* Corrects inability to style clickable input types in iOS */
      -webkit-appearance: none;
    }
   
    
    /*
      Font family

      Traditionally you would include this in the <head>, but since these styles
      are not being requests as another file to fetch, it's OK to import the
      font family because it's not as slow as tranditional setups.
    */
    @import url('https://fonts.googleapis.com/css?family=Crimson+Text|Muli:400,600,700');  
    
    body,
    html {
      padding: 0;
      margin: 0;
      font-size: 16px;
      font-family: 'Muli', sans-serif;
      line-height: 1.5;
      color: ${COLORS.neutral[400]}
    }
    
    /*
      Font smoothing and box sizing to border-box.
    */
    * {
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
    }

    a {
      color: inherit;
      text-decoration: none;
      cursor: pointer;
    }

    button {
      cursor: pointer;
    }
    
    /*
      Spacing helpers
    */
    .y-spacing > *:not(:last-child) {
      margin-bottom: ${SPACING["XL"]};
    }
    .x-spacing > *:not(:last-child) {
      margin-right: ${SPACING["XL"]};
    }
    .layout-flex {
      display: flex;
    }

    /*
      Accessibility utilities
    */
    .visually-hidden {
      /* https://snook.ca/archives/html_and_css/hiding-content-for-accessibility */
      position: absolute !important;
      height: 1px; width: 1px;
      overflow: hidden;
    }
  `;

  return (
    <Global
      styles={css`
        ${stylesheet}
      `}
    />
  );
}

export const Margins = styled("div")({
  width: "100%",
  margin: "0 auto",
  maxWidth: "1280px",
  padding: `0 ${SPACING["M"]}`,
  [MEDIA_QUERIES.LARGESCREEN]: {
    padding: `0 ${SPACING["2XL"]}`
  }
});

export const LargeScreen = styled("div")({
  display: "none",
  [MEDIA_QUERIES.LARGESCREEN]: {
    display: "block"
  }
});

/*
  "default",
  "subtle",
  "light",
  "special",
  "list",
  "list-medium",
  "list-strong",
  "description"
*/

const DEFAULT_LINK_STYLE = {
  color: COLORS.teal["400"],
  boxShadow: `inset 0 -1px ${COLORS.teal[400]}`,
  ":hover": {
    boxShadow: `inset 0 -2px ${COLORS.teal[400]}`
  }
};

export const LINK_STYLES = {
  default: DEFAULT_LINK_STYLE,
  subtle: {
    color: COLORS.neutral["400"],
    boxShadow: `inset 0 -1px ${COLORS.neutral[300]}`,
    ":hover": {
      boxShadow: `inset 0 -2px ${COLORS.neutral[300]}`
    }
  },
  light: {
    color: "white",
    boxShadow: `inset 0 -1px white`,
    ":hover": {
      boxShadow: `inset 0 -2px white`
    }
  },
  special: {
    ...TYPOGRAPHY["3XS"],
    color: COLORS.neutral["300"],
    ":hover": {
      boxShadow: `inset 0 -1px ${COLORS.neutral[300]}`
    }
  },
  list: {
    color: COLORS.neutral["400"],
    ":hover": {
      boxShadow: `inset 0 -1px ${COLORS.neutral[400]}`
    }
  },
  "list-medium": {
    fontWeight: "600",
    ":hover": {
      boxShadow: `inset 0 -2px ${COLORS.teal[400]}`
    }
  },
  "list-strong": {
    fontWeight: "800",
    color: COLORS.neutral["400"],
    ":hover": {
      boxShadow: `inset 0 -1px ${COLORS.neutral[400]}`
    }
  },
  description: {
    ...TYPOGRAPHY["XS"],
    fontWeight: "600",
    color: COLORS.neutral["400"],
    boxShadow: `inset 0 -1px ${COLORS.teal[400]}`,
    ":hover": {
      boxShadow: `inset 0 -2px ${COLORS.teal[400]}`
    }
  },

  /*
    DEPRECATED kinds

    To prevent a breaking change direct previously supported
    link kinds to the default link style.
  */
  "special-subtle": DEFAULT_LINK_STYLE
};

export const SmallScreen = styled("div")({
  display: "block",
  [MEDIA_QUERIES.LARGESCREEN]: {
    display: "none"
  }
});
