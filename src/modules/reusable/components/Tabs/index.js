import styled from '@emotion/styled';
import {
  Tab as UnstyledTab,
  TabList as UnstyledTabList,
  Tabs as UnstyledTabs,
  TabPanel as UnstyledTabPanel
} from 'react-tabs';

const Tabs = styled(UnstyledTabs)({
  width: '100%'
});

const TabList = styled(UnstyledTabList)({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  borderLeft: 'solid 2px var(--search-color-grey-400)',
  '@media only screen and (min-width: 641px)': {
    display: 'flex',
    alignItems: 'baseline',
    borderLeft: 'none',
    borderBottom: 'solid 2px var(--search-color-grey-400)'
  }
});

const dynamicTabStyles = (props) => {
  if (props.selected) {
    return {
      fontWeight: '600',
      color: 'var(--search-color-blue-400)',
      borderLeft: 'solid 3px var(--search-color-blue-400)',
      background: 'var(--search-color-grey-200)',
      '@media only screen and (min-width: 641px)': {
        borderLeft: 'none',
        background: 'none',
        border: 'solid 1px var(--search-color-grey-400)',
        borderTop: 'solid 3px var(--search-color-blue-400)',
        borderBottom: 'solid 2px white'
      }
    };
  } else {
    return {
      ':hover': {
        '@media only screen and (min-width: 641px)': {
          borderBottom: 'solid 2px var(--search-color-grey-500)'
        }
      }
    };
  }

  // return {}
};

const Tab = styled(UnstyledTab)(
  {
    cursor: 'pointer',
    padding: '0.5rem 1.25rem',
    borderLeft: 'solid 3px transparent',
    marginLeft: '-2px',
    '@media only screen and (min-width: 641px)': {
      marginBottom: '-2px',
      marginLeft: 0,
      borderLeft: 'none'
    }
  },
  dynamicTabStyles
);

const TabPanel = styled(UnstyledTabPanel)({
  ':empty': {
    display: 'none'
  },
  '@media only screen and (min-width: 641px)': {
    padding: '0.5rem 0'
  }
});

Tab.tabsRole = 'Tab';
Tabs.tabsRole = 'Tabs';
TabPanel.tabsRole = 'TabPanel';
TabList.tabsRole = 'TabList';

export {
  Tab,
  TabList,
  Tabs,
  TabPanel
};
