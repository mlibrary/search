import React from 'react';

const Icon = ({ name }) => {
  switch (name) {
    case 'alert':
    return (
      <svg viewBox="0 0 20 20" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-857.000000, -61.000000)" fill="#000000">
            <g transform="translate(822.000000, 60.000000)">
              <g transform="translate(34.000000, 0.000000)">
                <path d="M11.9994,11.998 L9.9994,11.998 L9.9994,5.99805 L11.9994,5.99805 L11.9994,11.998 Z M11.9994,15.998 L9.9994,15.998 L9.9994,13.998 L11.9994,13.998 L11.9994,15.998 Z M10.9994,0.99805 C5.47639,0.99805 0.99939,5.47504 0.99939,10.998 C0.99939,16.5211 5.47639,20.998 10.9994,20.998 C16.5224,20.998 20.9994,16.5211 20.9994,10.998 C20.9994,5.47504 16.5224,0.99805 10.9994,0.99805 L10.9994,0.99805 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'newspaper':
    return (
      <svg viewBox="0 0 20 18" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-131.000000, -627.000000)">
            <g transform="translate(131.000000, 627.000000)">
              <path d="M18,8 L2,8 L2,4.99999 L18,4.99999 L18,8 Z M18,10 L11,10 L11,9 L18,9 L18,10 Z M18,12 L11,12 L11,11 L18,11 L18,12 Z M18,14 L11,14 L11,13 L18,13 L18,14 Z M18,16 L11,16 L11,15 L18,15 L18,16 Z M10,16 L2,16 L2,9 L10,9 L10,16 Z M18.333,1.66704 L16.667,-9.99999997e-06 L15,1.66704 L13.333,-9.99999997e-06 L11.667,1.66704 L10,-9.99999997e-06 L8.333,1.66704 L6.66701,-9.99999997e-06 L5,1.66704 L3.33299,-9.99999997e-06 L1.66701,1.66704 L0,-9.99999997e-06 L0,16 C0,17.104 0.89501,18 2,18 L18,18 C19.104,18 19.99,17.104 19.99,16 L20,-9.99999997e-06 L18.333,1.66704 L18.333,1.66704 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'book-multiple-variant':
    return (
      <svg viewBox="0 0 18 18" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-211.000000, -136.000000)">
            <g transform="translate(68.000000, 61.000000)">
              <g transform="translate(143.000000, 75.000000)">
                <path d="M2,9.99999997e-06 L16,9.99999997e-06 C17.1046,9.99999997e-06 18,0.89544 18,2.00001 L18,16 C18,17.1046 17.1046,18 16,18 L2,18 C0.89543,18 0,17.1046 0,16 L0,2.00001 C0,0.89544 0.89543,9.99999997e-06 2,9.99999997e-06 L2,9.99999997e-06 Z M4,4.00001 L4,6.00001 L14,6.00001 L14,4.00001 L4,4.00001 L4,4.00001 Z M4,8 L4,10 L14,10 L14,8 L4,8 L4,8 Z M4,12 L4,14 L11,14 L11,12 L4,12 L4,12 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'volume':
    return (
      <svg viewBox="0 0 18 18" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-233.000000, -592.000000)">
            <g transform="translate(232.000000, 592.000000)">
              <path d="M11.9994,0.22858 L11.9994,2.29156 C14.8904,3.15253 16.9994,5.82855 16.9994,8.9976 C16.9994,12.1675 14.8904,14.8436 11.9994,15.7045 L11.9994,17.7675 C16.0064,16.8566 18.9994,13.2805 18.9994,8.9976 C18.9994,4.71558 16.0064,1.13855 11.9994,0.22858 L11.9994,0.22858 Z M14.4994,8.9976 C14.4994,7.2325 13.4794,5.70752 11.9994,4.97052 L11.9994,13.0256 C13.4794,12.2875 14.4994,10.7635 14.4994,8.9976 L14.4994,8.9976 Z M0.9994,5.99756 L0.9994,11.9976 L4.9994,11.9976 L9.9994,16.9976 L9.9994,0.99756 L4.9994,5.99756 L0.9994,5.99756 L0.9994,5.99756 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'gamepad':
    return (
      <svg width="1.2rem" height="1rem" viewBox="0 0 22 12" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-229.000000, -773.000000)">
            <g transform="translate(229.000000, 773.000000)">
              <path d="M6,0 L16,0 C19.3137,0 22,2.68629 22,6 C22,9.3137 19.3137,12 16,12 C14.223,12 12.6264,11.2275 11.5278,10 L10.4722,10 C9.3736,11.2275 7.777,12 6,12 C2.68629,12 0,9.3137 0,6 C0,2.68629 2.68629,0 6,0 L6,0 Z M5,3 L5,5 L3,5 L3,7 L5,7 L5,9 L7,9 L7,7 L9,7 L9,5 L7,5 L7,3 L5,3 L5,3 Z M14.5,6 C13.6716,6 13,6.6716 13,7.5 C13,8.3284 13.6716,9 14.5,9 C15.3284,9 16,8.3284 16,7.5 C16,6.6716 15.3284,6 14.5,6 L14.5,6 Z M17.5,3 C16.6716,3 16,3.67158 16,4.5 C16,5.3284 16.6716,6 17.5,6 C18.3284,6 19,5.3284 19,4.5 C19,3.67158 18.3284,3 17.5,3 L17.5,3 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'archive':
    return (
      <svg viewBox="0 0 18 18" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-234.000000, -1219.000000)">
            <g transform="translate(234.000000, 1219.000000)">
              <path d="M0,0 L18,0 L18,4 L0,4 L0,0 L0,0 Z M1,5.00001 L17,5.00001 L17,18 L1,18 L1,5.00001 L1,5.00001 Z M6.5,8 C6.22386,8 6,8.2239 6,8.5 L6,10 L12,10 L12,8.5 C12,8.2239 11.7761,8 11.5,8 L6.5,8 L6.5,8 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'eye':
    return (
      <svg viewBox="0 0 22 15" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-230.000000, -1031.000000)">
            <path d="M240.99999,1035.5 C239.34299,1035.5 238,1036.84297 238,1038.49997 C238,1040.15697 239.34299,1041.49997 240.99999,1041.49997 C242.65699,1041.49997 243.99999,1040.15697 243.99999,1038.49997 C243.99999,1036.84297 242.65699,1035.5 240.99999,1035.5 L240.99999,1035.5 Z M240.99999,1043.49997 C238.239,1043.49997 236,1041.26097 236,1038.49997 C236,1035.73901 238.239,1033.5 240.99999,1033.5 C243.76099,1033.5 245.99999,1035.73901 245.99999,1038.49997 C245.99999,1041.26097 243.76099,1043.49997 240.99999,1043.49997 L240.99999,1043.49997 Z M240.99999,1031 C235.998,1031 231.728,1034.11102 230,1038.49997 C231.728,1042.88897 235.998,1045.99997 240.99999,1045.99997 C246.00299,1045.99997 250.27199,1042.88897 251.99999,1038.49997 C250.27199,1034.11102 246.00299,1031 240.99999,1031 L240.99999,1031 Z"></path>
          </g>
        </g>
      </svg>
    )
    case 'database':
    return (
      <svg viewBox="0 0 16 18" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-557.000000, -635.000000)">
            <g transform="translate(519.000000, 562.000000)">
              <g transform="translate(38.000000, 73.000000)">
                <path d="M8,0 C3.58172,0 0,1.7909 0,4 C0,6.2091 3.58172,8 8,8 C12.4183,8 16,6.2091 16,4 C16,1.7909 12.4183,0 8,0 L8,0 Z M0,6 L0,9 C0,11.2091 3.58172,13 8,13 C12.4183,13 16,11.2091 16,9 L16,6 C16,8.2091 12.4183,10 8,10 C3.58172,10 0,8.2091 0,6 L0,6 Z M0,11 L0,14 C0,16.2091 3.58172,18 8,18 C12.4183,18 16,16.2091 16,14 L16,11 C16,13.2091 12.4183,15 8,15 C3.58172,15 0,13.2091 0,11 L0,11 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'multi-result':
    return (
      <svg viewBox="0 0 16 16" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-372.000000, -16.000000)">
            <g transform="translate(372.000000, 12.000000)">
              <path d="M9,4 L9,9 L16,9 L16,4 L9,4 Z M9,20 L16,20 L16,11 L9,11 L9,20 Z M0,20 L7,20 L7,15 L0,15 L0,20 Z M0,13 L7,13 L7,4 L0,4 L0,13 L0,13 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'search':
    return (
      <svg viewBox="0 0 16 16" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-950.000000, -28.000000)">
            <g transform="translate(934.000000, 16.000000)">
              <g transform="translate(16.000000, 12.000000)">
                <path d="M5.77777778,0 C8.9688,0 11.5555556,2.5868 11.5555556,5.77777778 C11.5555556,7.21324444 11.032,8.52648889 10.1655111,9.53697778 L10.4063111,9.77777778 L11.1111111,9.77777778 L15.5555556,14.2222222 L14.2222222,15.5555556 L9.77777778,11.1111111 L9.77777778,10.4063111 L9.53697778,10.1655111 C8.52648889,11.032 7.21324444,11.5555556 5.77777778,11.5555556 C2.5868,11.5555556 0,8.9688 0,5.77777778 C0,2.5868 2.5868,0 5.77777778,0 L5.77777778,0 Z M5.77777778,1.77778667 C3.56864,1.77778667 1.77777778,3.56864889 1.77777778,5.77778667 C1.77777778,7.98693333 3.56864,9.77777778 5.77777778,9.77777778 C7.98693333,9.77777778 9.77777778,7.98693333 9.77777778,5.77778667 C9.77777778,3.56864889 7.98693333,1.77778667 5.77777778,1.77778667 L5.77777778,1.77778667 Z" ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'timetable':
    return (
      <svg viewBox="0 0 20 20" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-658.000000, -480.000000)">
            <g transform="translate(519.000000, 289.000000)">
              <g transform="translate(139.000000, 191.000000)">
                <path d="M12,10 L13.5,10 L13.5,12.823 L15.9382,14.2307 L15.1882,15.5297 L12,13.689 L12,10 L12,10 Z M2,9.99999997e-06 L16,2e-05 C17.1046,2e-05 18,0.89545 18,2.00002 L18,8.101 C19.2372,9.3636 20,11.0927 20,13 C20,16.866 16.866,20 13,20 C11.0927,20 9.3636,19.2372 8.101,18 L2,18 C0.89543,18 0,17.1046 0,16 L0,2.00001 C0,0.89544 0.89543,9.99999997e-06 2,9.99999997e-06 L2,9.99999997e-06 Z M2,13 L2,16 L6.67363,16 C6.24169,15.0907 6,14.0736 6,13 L2,13 L2,13 Z M2,6.00001 L8,6 L8,3 L2,3.00001 L2,6.00001 L2,6.00001 Z M16,6.00001 L16,3.00001 L10,3 L10,6 L16,6.00001 L16,6.00001 Z M2,11 L6.28987,11 C6.63282,9.8477 7.2645,8.8197 8.101,8 L2,8 L2,11 L2,11 Z M13,8.1539 C10.3235,8.1539 8.1538,10.3236 8.1538,13 C8.1538,15.6765 10.3235,17.8462 13,17.8462 C15.6764,17.8462 17.8461,15.6765 17.8461,13 C17.8461,10.3236 15.6764,8.1539 13,8.1539 L13,8.1539 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'book-variant':
    return (
      <svg viewBox="0 0 16 20" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-279.000000, -61.000000)">
            <g transform="translate(68.000000, 61.000000)">
              <g transform="translate(211.000000, 0.000000)">
                <path d="M2,2 L7,2 L7,10 L4.5,8.5 L2,10 L2,2 Z M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,18 C0,19.1 0.9,20 2,20 L14,20 C15.1,20 16,19.1 16,18 L16,2 C16,0.9 15.1,0 14,0 L14,0 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'file':
    return (
      <svg viewBox="0 0 32 40" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-670.000000, -224.000000)">
            <g transform="translate(670.000000, 224.000000)">
              <path d="M18.00002,14 L29.00002,14 L18.00002,3 L18.00002,14 L18.00002,14 Z M4,0 L20.00002,0 L32.00002,12 L32.00002,36.00006 C32.00002,38.20806 30.20802,40.00006 28.00002,40.00006 L3.97998,40.00006 C1.77198,40.00006 0,38.20806 0,36.00006 L0.02002,4 C0.02002,1.792 1.78996,0 4,0 L4,0 Z M22.00122,32.00386 L22.00122,28.00386 L3.98124,28.00386 L3.98124,32.00386 L22.00122,32.00386 L22.00122,32.00386 Z M28.00122,24.00386 L28.00122,20.00386 L3.98124,20.00386 L3.98124,24.00386 L28.00122,24.00386 L28.00122,24.00386 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'filmstrip':
    return (
      <svg viewBox="0 0 16 19" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-236.000000, -1142.000000)">
            <g transform="translate(235.000000, 1142.000000)">
              <path d="M14.9994,6.99805 L12.9994,6.99805 L12.9994,4.99805 L14.9994,4.99805 L14.9994,6.99805 Z M14.9994,10.998 L12.9994,10.998 L12.9994,8.998 L14.9994,8.998 L14.9994,10.998 Z M14.9994,14.998 L12.9994,14.998 L12.9994,12.998 L14.9994,12.998 L14.9994,14.998 Z M4.99939,6.99805 L2.99939,6.99805 L2.99939,4.99805 L4.99939,4.99805 L4.99939,6.99805 Z M4.99939,10.998 L2.99939,10.998 L2.99939,8.998 L4.99939,8.998 L4.99939,10.998 Z M4.99939,14.998 L2.99939,14.998 L2.99939,12.998 L4.99939,12.998 L4.99939,14.998 Z M14.9994,0.99805 L14.9994,2.99805 L12.9994,2.99805 L12.9994,0.99805 L4.99939,0.99805 L4.99939,2.99805 L2.99939,2.99805 L2.99939,0.99805 L0.99939,0.99805 L0.99939,18.998 L2.99939,18.998 L2.99939,16.998 L4.99939,16.998 L4.99939,18.998 L12.9994,18.998 L12.9994,16.998 L14.9994,16.998 L14.9994,18.998 L16.9994,18.998 L16.9994,0.99805 L14.9994,0.99805 L14.9994,0.99805 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'music-note':
    return (
      <svg viewBox="0 0 16 20" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-236.000000, -1104.000000)">
            <g transform="translate(236.000000, 1104.000000)">
              <path d="M8,0 C8.4348,0 8.8373,0.13877 9.1654,0.37444 C11.7769,2.24963 14.3885,4.12481 15.1109,6.31241 C15.8333,8.5 15,11 13.5,13.5 C16,7 9,5.5 9,5.5 L9,16 C9,18.2091 6.9853,20 4.5,20 C2.01472,20 0,18.2091 0,16 C0,13.7909 2.01472,12 4.5,12 C5.02595,12 5.53083,12.0802 6,12.2276 L6,2 C6,0.89543 6.8954,0 8,0 L8,0 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'script':
    return (
      <svg viewBox="0 0 20 20" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-232.000000, -1067.000000)">
            <g transform="translate(232.000000, 1067.000000)">
              <path d="M12,18 C13.1046,18 14,17.1046 14,16 L14,3 L7,2.99999 C6.44771,3 6,3.44771 6,3.99999 L6,14 L3,14 L3,3.00001 C3,1.34316 4.34319,9.99999997e-06 6.00004,9.99999997e-06 L17,9.99999997e-06 C18.6568,9.99999997e-06 20,1.34316 20,3.00001 L20,4 L16,4 L16,16 L16,17 C16,18.6569 14.6568,20 13,20 L3,20 C1.34315,20 0,18.6569 0,17 L0,16 L10,16 C10,17.1046 10.8954,18 12,18 L12,18 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'disc':
    return (
      <svg viewBox="0 0 20 20" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-230.000000, -652.000000)">
            <g transform="translate(230.000000, 652.000000)">
              <path d="M10.00001,0 C4.477,0 0,4.477 0,10.00003 C0,15.52303 4.477,20.00003 10.00001,20.00003 C15.52201,20.00003 20.00001,15.52303 20.00001,10.00003 C20.00001,4.477 15.52201,0 10.00001,0 L10.00001,0 Z"></path>
              <path d="M10.000006,8 C8.89539737,8 7.999992,8.89540537 7.999992,10.000018 C7.999992,11.1046246 8.89539737,12.00003 10.000006,12.00003 C11.1044126,12.00003 12.000018,11.1046246 12.000018,10.000018 C12.000018,8.89540537 11.1044126,8 10.000006,8 L10.000006,8 Z" fill="#FFFFFF"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'map':
    return (
      <svg viewBox="0 0 18 18" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-234.000000, -1183.000000)">
            <g transform="translate(233.000000, 1182.000000)">
              <path d="M12.9994,16.9981 L6.99939,14.8911 L6.99939,2.99807 L12.9994,5.10506 L12.9994,16.9981 Z M18.4994,0.99807 C18.4444,0.99807 18.3924,1.00406 18.3434,1.02306 L12.9994,3.09807 L6.99939,0.99807 L1.3624,2.89606 C1.1524,2.96607 0.99939,3.14707 0.99939,3.37607 L0.99939,18.4981 C0.99939,18.7741 1.22339,18.9981 1.49939,18.9981 C1.55438,18.9981 1.60638,18.9921 1.6564,18.9731 L6.99939,16.8981 L12.9994,18.9981 L18.6374,17.1001 C18.8474,17.0271 18.9994,16.8491 18.9994,16.6191 L18.9994,1.49807 C18.9994,1.22108 18.7764,0.99807 18.4994,0.99807 L18.4994,0.99807 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'image':
    return (
      <svg viewBox="0 0 40 40" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-806.000000, -224.000000)">
            <g transform="translate(806.000000, 224.000000)">
              <path d="M4,0 L36,0 C38.2092,0 40,1.79084 40,3.99998 L40,35.99998 C40,38.20918 38.2092,39.99998 36,39.99998 L4,39.99998 C1.79086,39.99998 0,38.20918 0,35.99998 L0,3.99998 C0,1.79084 1.79086,0 4,0 L4,0 Z M10,3.99998 C7.23858,3.99998 5,6.23856 5,8.99998 C5,11.7614 7.23858,13.99998 10,13.99998 C12.76142,13.99998 15,11.7614 15,8.99998 C15,6.23856 12.76142,3.99998 10,3.99998 L10,3.99998 Z M4,31.99998 L4,35.99998 L36,35.99998 L36,23.99998 L30,17.99998 L18,29.99998 L12,23.99998 L4,31.99998 L4,31.99998 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'image-multiple':
    return (
      <svg viewBox="0 0 20 20" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-250.000000, -323.000000)" fill="#000000">
            <g transform="translate(68.000000, 61.000000)">
              <g transform="translate(182.000000, 262.000000)">
                <path d="M20.0025,14.0012 L20.0025,1.99875 C20.0025,0.9 19.0987,0.0025 18,0.0025 L5.9975,0.0025 C4.9,0.0025 4.00125,0.9 4.00125,1.99875 L4.00125,14.0012 C4.00125,15.1 4.9,15.9975 5.9975,15.9975 L18,15.9975 C19.0987,15.9975 20.0025,15.1 20.0025,14.0012 L20.0025,14.0012 Z M9.0013,10.0025 L11.0325,12.7125 L14.0012,9.0012 L18,14.0012 L5.9975,14.0012 L9.0013,10.0025 Z M0.0025,4.00125 L0.0025,18 C0.0025,19.0988 0.9,20.0025 1.99875,20.0025 L15.9975,20.0025 L15.9975,18 L1.99875,18 L1.99875,4.00125 L0.0025,4.00125 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'website':
    return (
      <svg viewBox="0 0 20 20" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-696.000000, -711.000000)">
            <g transform="translate(519.000000, 562.000000)">
              <g transform="translate(177.000000, 148.000000)">
                <path d="M14.3607,12.998 C14.4427,12.3411 14.4997,11.6771 14.4997,10.998 C14.4997,10.319 14.4427,9.655 14.3607,8.99805 L17.7367,8.99805 C17.9027,9.6381 17.9997,10.306 17.9997,10.998 C17.9997,11.6901 17.9027,12.358 17.7367,12.998 L14.3607,12.998 Z M12.5927,18.559 C13.1927,17.446 13.6487,16.248 13.9717,14.998 L16.9207,14.998 C15.9617,16.652 14.4297,17.928 12.5927,18.559 L12.5927,18.559 Z M12.3387,12.998 L7.6597,12.998 C7.5647,12.343 7.49969,11.6791 7.49969,10.998 C7.49969,10.317 7.5647,9.6531 7.6597,8.99805 L12.3387,8.99805 C12.4337,9.6531 12.4997,10.317 12.4997,10.998 C12.4997,11.6791 12.4337,12.343 12.3387,12.998 L12.3387,12.998 Z M9.9977,18.962 C9.1657,17.762 8.5157,16.4291 8.0887,14.998 L11.9097,14.998 C11.4817,16.4291 10.8317,17.762 9.9977,18.962 L9.9977,18.962 Z M6.0257,6.99805 L3.07669,6.99805 C4.0347,5.34204 5.56668,4.06403 7.40469,3.43506 C6.80469,4.54803 6.34869,5.74603 6.0257,6.99805 L6.0257,6.99805 Z M3.07669,14.998 L6.0257,14.998 C6.34869,16.249 6.80469,17.4481 7.40469,18.561 C5.56668,17.9321 4.0347,16.6541 3.07669,14.998 L3.07669,14.998 Z M2.26068,12.998 C2.0957,12.358 1.99969,11.6901 1.99969,10.998 C1.99969,10.306 2.0957,9.6381 2.26068,8.99805 L5.6377,8.99805 C5.55569,9.655 5.49969,10.319 5.49969,10.998 C5.49969,11.6771 5.55569,12.3411 5.6377,12.998 L2.26068,12.998 Z M9.9977,3.03406 C10.8317,4.23407 11.4817,5.56702 11.9097,6.99805 L8.0887,6.99805 C8.5157,5.56702 9.1657,4.23407 9.9977,3.03406 L9.9977,3.03406 Z M16.9207,6.99805 L13.9717,6.99805 C13.6487,5.74805 13.1927,4.55005 12.5927,3.43707 C14.4297,4.06805 15.9617,5.34406 16.9207,6.99805 L16.9207,6.99805 Z M9.9937,0.99805 C4.46768,0.99805 -0.00031,5.47504 -0.00031,10.998 C-0.00031,16.5211 4.46768,20.998 9.9937,20.998 C15.5207,20.998 19.9997,16.5211 19.9997,10.998 C19.9997,5.47504 15.5207,0.99805 9.9937,0.99805 L9.9937,0.99805 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'chevron-down':
    return (
      <svg viewBox="0 0 12 8" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-353.000000, -585.000000)">
            <g transform="translate(60.000000, 477.000000)">
              <g transform="translate(292.000000, 108.000000)">
                <polygon points="2.41348 0.58407 6.9995 5.1701 11.5855 0.58407 12.9995 1.99807 6.9995 7.9981 0.99948 1.99807"></polygon>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'chevron-right':
    return (
      <svg viewBox="0 0 8 12" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(0.000000, -1.000000)" fill="#000000">
            <polygon points="0.58527 11.584 5.1713 6.998 0.58527 2.41198 1.99927 0.99798 7.9993 6.998 1.99927 12.998"></polygon>
          </g>
        </g>
      </svg>
    )
    case 'minus':
    return (
      <svg viewBox="0 0 14 2" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-823.000000, -212.000000)">
            <g transform="translate(822.000000, 60.000000)">
              <g transform="translate(0.000000, 151.000000)">
                <polygon points="14.9994 2.998 0.99943 2.998 0.99995 1.0001 14.9994 0.998"></polygon>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'content-save':
    return (
      <svg viewBox="0 0 18 18" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-203.000000, -1302.000000)">
            <g transform="translate(203.000000, 1302.000000)">
              <path d="M12,6 L2,6 L2,2 L12,2 L12,6 Z M9,16 C7.34,16 6,14.66 6,13 C6,11.34 7.34,10 9,10 C10.66,10 12,11.34 12,13 C12,14.66 10.66,16 9,16 L9,16 Z M14,0 L2,0 C0.89,0 0,0.9 0,2 L0,16 C0,17.1 0.89,18 2,18 L16,18 C17.1,18 18,17.1 18,16 L18,4 L14,0 L14,0 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'chart-line':
    return (
      <svg viewBox="0 0 20 18" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-140.000000, -37.000000)">
            <g transform="translate(140.000000, 37.000000)">
              <polygon points="14.0071 8.7776 18.2401 1.4457 19.9722 2.4457 14.7391 11.5096 8.2272 7.75 3.4641 16 20 16 20 18 0 18 0 0 2 0 2 14.5359 7.4952 5.01794"></polygon>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'close':
    return (
      <svg viewBox="0 0 14 14" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-274.000000, -993.000000)">
            <g transform="translate(60.000000, 918.000000)">
              <g transform="translate(214.000000, 75.000000)">
                <polygon points="14 1.41 12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7"></polygon>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'arrow-right-drop-circle':
    return (
      <svg viewBox="0 0 20 20" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-231.000000, -692.000000)">
            <g transform="translate(231.000000, 692.000000)">
              <path d="M8,14.50005 L8,5.5 L14.00001,10.00005 L8,14.50005 Z M10.00001,0 C4.47699,0 0,4.47699 0,10.00005 C0,15.52305 4.47699,20.00005 10.00001,20.00005 C15.52301,20.00005 20.00001,15.52305 20.00001,10.00005 C20.00001,4.47699 15.52301,0 10.00001,0 L10.00001,0 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'checkbox-checked':
    return (
      <svg viewBox="0 0 18 18" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-240.000000, -957.000000)">
            <g transform="translate(60.000000, 918.000000)">
              <g transform="translate(179.000000, 38.000000)">
                <path d="M7.9994,14.9981 L2.9994,9.9981 L4.4134,8.5841 L7.9994,12.1701 L15.5854,4.58407 L16.9994,5.99807 L7.9994,14.9981 Z M16.9994,0.99807 L2.9994,0.99807 C1.8934,0.99807 0.9994,1.89307 0.9994,2.99807 L0.9994,16.9981 C0.9994,18.1031 1.8934,18.9981 2.9994,18.9981 L16.9994,18.9981 C18.1044,18.9981 18.9994,18.1031 18.9994,16.9981 L18.9994,2.99807 C18.9994,1.89307 18.1044,0.99807 16.9994,0.99807 L16.9994,0.99807 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'checkbox-unchecked':
    return (
      <svg viewBox="0 0 18 18" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-61.000000, -957.000000)">
            <g transform="translate(60.000000, 918.000000)">
              <g transform="translate(0.000000, 38.000000)">
                <path d="M16.9994,0.99807 L2.99939,0.99807 C1.89439,0.99807 0.99939,1.89307 0.99939,2.99807 L0.99939,16.9981 C0.99939,18.1031 1.89439,18.9981 2.99939,18.9981 L16.9994,18.9981 C18.1034,18.9981 18.9994,18.1031 18.9994,16.9981 L18.9994,2.99807 C18.9994,1.89307 18.1034,0.99807 16.9994,0.99807 L16.9994,0.99807 Z M16.9994,2.99807 L16.9994,16.9981 L2.99939,16.9991 L2.99939,2.99807 L16.9994,2.99807 L16.9994,2.99807 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'xml':
    return (
      <svg viewBox="0 0 22 18" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-109.000000, -104.000000)">
            <g transform="translate(109.000000, 103.000000)">
              <path d="M11.8931,0.98876 L13.8494,1.40458 L10.1069,19.0112 L8.15065,18.5954 L11.8931,0.98876 L11.8931,0.98876 Z M18.5858,9.9926 L15,6.40686 L15,3.57844 L21.4216,10 L15,16.4103 L15,13.5784 L18.5858,9.9926 L18.5858,9.9926 Z M0.57842,10.0031 L7,3.58148 L7,6.4099 L3.41421,9.9957 L7,13.5815 L7,16.4134 L0.57842,10.0031 L0.57842,10.0031 Z"></path>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'shape-plus':
      return (
        <svg viewBox="0 0 20 20" className="icon">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-393.000000, -303.000000)" fill="#000000">
              <g transform="translate(393.000000, 303.000000)">
                <path d="M0,-1e-05 L9,-1e-05 L9,9 L0,9 L0,-1e-05 L0,-1e-05 Z M15.5,1e-05 C17.9853,1e-05 20,2.01473 20,4.50001 C20,6.98529 17.9853,9 15.5,9 C13.0147,9 11,6.98529 11,4.50001 C11,2.01473 13.0147,1e-05 15.5,1e-05 L15.5,1e-05 Z M4.5,12 L9,20 L0,20 L4.5,12 L4.5,12 Z M17,15 L20,15 L20,17 L17,17 L17,20 L15,20 L15,17 L12,17 L12,15 L15,15 L15,12 L17,12 L17,15 L17,15 Z"></path>
              </g>
            </g>
          </g>
        </svg>
      )
    case 'motion-picture':
    return (
      <svg viewBox="0 0 21 20" version="1.1" className="icon">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-974.000000, -677.000000)" fill="#000000">
            <g transform="translate(974.000000, 677.000000)">
              <g transform="translate(0.000000, 8.000000)">
                <path d="M16.3333333,4.5 L16.3333333,1.00003 C16.3333333,0.44803 15.8106667,2.99999999e-05 15.1666667,2.99999999e-05 L1.16666667,2.99999999e-05 C0.522655,2.99999999e-05 0,0.44803 0,1.00003 L0,11 C0,11.552 0.522655,12 1.16666667,12 L15.1666667,12 C15.8106667,12 16.3333333,11.552 16.3333333,11 L16.3333333,7.5 L21,11.5 L21,0.50003 L16.3333333,4.5 L16.3333333,4.5 Z"></path>
              </g>
              <circle id="Oval" cx="3.5" cy="3.5" r="3.5"></circle>
              <circle id="Oval" cx="12.5" cy="3.5" r="3.5"></circle>
            </g>
          </g>
        </g>
      </svg>
    )
    case 'unknown':
    return (<span className="icon" style={{ 'fontWeight': 'bold' }}>🤷</span>)
    default:
    return null
  }
}

export default Icon;
