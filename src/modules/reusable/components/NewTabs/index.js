import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function NewTabs ({ children, defaultActiveIndex, ...rest }) {
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
    let newIndex;
    if (event.key === 'ArrowRight') {
      newIndex = activeIndex < tabsRef.current.length - 1 ? activeIndex + 1 : 0;
      setActiveIndex(newIndex);
      event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
      newIndex = activeIndex > 0 ? activeIndex - 1 : tabsRef.current.length - 1;
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
        {childrenByDisplayName('NewTab').map((child, index) => {
          return React.cloneElement(child, {
            onClick: () => {
              return setActiveIndex(index);
            },
            ref: (el) => {
              return updateTabRefs(el, index);
            },
            isActive: index === activeIndex,
            id: `tab-${index}`,
            ariaControls: `panel-${index}`,
            tabIndex: index === activeIndex ? 0 : -1
          });
        })}
      </div>
      {childrenByDisplayName('NewTabPanel').map((child, index) => {
        return React.cloneElement(child, {
          isActive: index === activeIndex,
          id: `panel-${index}`,
          'aria-labelledby': `tab-${index}`
        });
      })}
    </>
  );
}

NewTabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  defaultActiveIndex: PropTypes.number
};

export default NewTabs;
