import styled from '@emotion/styled';
import {
  Tab as UnstyledTab,
  TabList as UnstyledTabList,
  Tabs as UnstyledTabs,
  TabPanel as UnstyledTabPanel
} from 'react-tabs';
import { SEARCH_COLORS, MEDIA_QUERIES } from '../../umich-lib-core-temp';

const Tabs = styled(UnstyledTabs)({
  width: '100%'
});

const TabList = styled(UnstyledTabList)({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  borderLeft: `solid 2px ${SEARCH_COLORS.grey[400]}`,
  [MEDIA_QUERIES.LARGESCREEN]: {
    display: 'flex',
    alignItems: 'baseline',
    borderLeft: 'none',
    borderBottom: `solid 2px ${SEARCH_COLORS.grey[400]}`
  }
});

const dynamicTabStyles = (props) => {
  if (props.selected) {
    return {
      fontWeight: '600',
      color: SEARCH_COLORS.blue[500],
      borderLeft: `solid 3px ${SEARCH_COLORS.blue[500]}`,
      background: SEARCH_COLORS.grey[200],
      [MEDIA_QUERIES.LARGESCREEN]: {
        borderLeft: 'none',
        background: 'none',
        border: `solid 1px ${SEARCH_COLORS.grey[400]}`,
        borderTop: `solid 3px ${SEARCH_COLORS.blue[500]}`,
        borderBottom: 'solid 2px white'
      }
    };
  } else {
    return {
      ':hover': {
        [MEDIA_QUERIES.LARGESCREEN]: {
          borderBottom: `solid 2px ${SEARCH_COLORS.grey[500]}`
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
    [MEDIA_QUERIES.LARGESCREEN]: {
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
  [MEDIA_QUERIES.LARGESCREEN]: {
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
