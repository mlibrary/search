import React from 'react';

const Icon = ({ name, size, color }) => {
  switch (name) {
    case 'multi-result':
      return (
        <svg width="1rem" height="1rem" viewBox="0 0 16 16" version="1.1" className="icon">
            <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Silo-Navigation-Catalog" transform="translate(-372.000000, -16.000000)" fill="#CCCCCC">
                    <g id="Silo-Navigation" transform="translate(372.000000, 12.000000)">
                        <path d="M9,4 L9,9 L16,9 L16,4 L9,4 Z M9,20 L16,20 L16,11 L9,11 L9,20 Z M0,20 L7,20 L7,15 L0,15 L0,20 Z M0,13 L7,13 L7,4 L0,4 L0,13 L0,13 Z" id="Shape"></path>
                    </g>
                </g>
            </g>
        </svg>
      )
    case 'search':
      return (
        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" className="icon">
            <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Search-Field" transform="translate(-950.000000, -28.000000)" fill="#FFFFFF">
                    <g id="Search-Button" transform="translate(934.000000, 16.000000)">
                        <g id="Icon-Search" transform="translate(16.000000, 12.000000)">
                            <path d="M5.77777778,0 C8.9688,0 11.5555556,2.5868 11.5555556,5.77777778 C11.5555556,7.21324444 11.032,8.52648889 10.1655111,9.53697778 L10.4063111,9.77777778 L11.1111111,9.77777778 L15.5555556,14.2222222 L14.2222222,15.5555556 L9.77777778,11.1111111 L9.77777778,10.4063111 L9.53697778,10.1655111 C8.52648889,11.032 7.21324444,11.5555556 5.77777778,11.5555556 C2.5868,11.5555556 0,8.9688 0,5.77777778 C0,2.5868 2.5868,0 5.77777778,0 L5.77777778,0 Z M5.77777778,1.77778667 C3.56864,1.77778667 1.77777778,3.56864889 1.77777778,5.77778667 C1.77777778,7.98693333 3.56864,9.77777778 5.77777778,9.77777778 C7.98693333,9.77777778 9.77777778,7.98693333 9.77777778,5.77778667 C9.77777778,3.56864889 7.98693333,1.77778667 5.77777778,1.77778667 L5.77777778,1.77778667 Z" id="Shape"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      )
    default:
      return null
  }
}

export default Icon;
