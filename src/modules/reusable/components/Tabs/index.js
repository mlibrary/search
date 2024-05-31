import './styles.css';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ children, defaultActiveIndex = 0, ...rest }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const tabsRef = useRef([]);

  const updateTabRefs = (el, index) => {
    if (el) {
      tabsRef.current[index] = el;
    }
  };

  useEffect(() => {
    tabsRef.current[activeIndex]?.focus();
  }, [activeIndex]);

  const handleKeyDown = (event) => {
    const { key } = event;
    const { length } = tabsRef.current;

    if (['ArrowLeft', 'ArrowRight'].includes(key)) {
      const newIndex = (key === 'ArrowRight')
        ? (activeIndex + 1) % length
        : (activeIndex - 1 + length) % length;

      setActiveIndex(newIndex);
      event.preventDefault();
    }
  };

  const childrenByDisplayName = (displayName) => {
    return React.Children.toArray(children).filter((child) => {
      return child.type.displayName === displayName;
    });
  };

  return (
    <>
      <div role='tablist' onKeyDown={handleKeyDown} {...rest}>
        {childrenByDisplayName('Tab').map((child, index) => {
          return React.cloneElement(child, {
            ariaControls: `panel-${index}`,
            id: `tab-${index}`,
            isActive: index === activeIndex,
            onClick: () => {
              return setActiveIndex(index);
            },
            ref: (el) => {
              return updateTabRefs(el, index);
            },
            tabIndex: index === activeIndex ? 0 : -1
          });
        })}
        <div />
      </div>
      {childrenByDisplayName('TabPanel').map((child, index) => {
        return React.cloneElement(child, {
          'aria-labelledby': `tab-${index}`,
          id: `panel-${index}`,
          isActive: index === activeIndex
        });
      })}
    </>
  );
};

Tabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  defaultActiveIndex: PropTypes.number
};

export default Tabs;
