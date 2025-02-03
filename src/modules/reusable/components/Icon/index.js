/* eslint 'camelcase': 'off', 'id-length': 'off' */
import React from 'react';

const icons = {
  archive: 'M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z',
  arrow_forward: 'M16.2,13H4v-2h12.2l-5.6-5.6L12,4l8,8l-8,8l-1.4-1.4L16.2,13z',
  book: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z',
  chat: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z',
  check_circle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  checkbox_checked: 'M7.9994,14.9981 L2.9994,9.9981 L4.4134,8.5841 L7.9994,12.1701 L15.5854,4.58407 L16.9994,5.99807 L7.9994,14.9981 Z M16.9994,0.99807 L2.9994,0.99807 C1.8934,0.99807 0.9994,1.89307 0.9994,2.99807 L0.9994,16.9981 C0.9994,18.1031 1.8934,18.9981 2.9994,18.9981 L16.9994,18.9981 C18.1044,18.9981 18.9994,18.1031 18.9994,16.9981 L18.9994,2.99807 C18.9994,1.89307 18.1044,0.99807 16.9994,0.99807 L16.9994,0.99807 Z',
  checkbox_unchecked: 'M16.9994,0.99807 L2.99939,0.99807 C1.89439,0.99807 0.99939,1.89307 0.99939,2.99807 L0.99939,16.9981 C0.99939,18.1031 1.89439,18.9981 2.99939,18.9981 L16.9994,18.9981 C18.1034,18.9981 18.9994,18.1031 18.9994,16.9981 L18.9994,2.99807 C18.9994,1.89307 18.1034,0.99807 16.9994,0.99807 L16.9994,0.99807 Z M16.9994,2.99807 L16.9994,16.9981 L2.99939,16.9991 L2.99939,2.99807 L16.9994,2.99807 L16.9994,2.99807 Z',
  chevron_left: 'M16.9,24L4.9,12,16.9,0l2.1,2.1-9.9,9.9,9.9,9.9-2.1,2.1Z',
  chevron_right: 'M14.8,12L4.9,2.1,7.1,0l12,12-12,12-2.1-2.1,9.9-9.9Z',
  close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  code: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
  collection_bookmark: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z',
  devices: 'M0,21v-3h3V5.3c0-.6.2-1.1.7-1.6.4-.4,1-.7,1.6-.7h17.2v2.2H5.2v12.7h6.7v3H0ZM16.1,21c-.3,0-.6-.1-.8-.3-.2-.2-.3-.5-.3-.8v-11.2c0-.3.1-.6.3-.8.2-.2.5-.3.8-.3h6.7c.3,0,.6.1.8.3s.3.5.3.8v11.2c0,.3-.1.6-.3.8s-.5.3-.8.3h-6.7Z',
  document: 'M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z',
  email: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  error: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  expand_less: 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z',
  expand_more: 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z',
  filter: 'M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z',
  format_quote: 'M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z',
  info: 'M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z',
  insert_drive_file: 'M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z',
  link: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
  list: 'M7,9v-2h14v2H7ZM7,13v-2h14v2H7ZM7,17v-2h14v2H7ZM4,9c-.3,0-.5,0-.7-.3-.2-.2-.3-.4-.3-.7s0-.5.3-.7c.2-.2.4-.3.7-.3s.5,0,.7.3.3.4.3.7,0,.5-.3.7-.4.3-.7.3ZM4,13c-.3,0-.5,0-.7-.3-.2-.2-.3-.4-.3-.7s0-.5.3-.7c.2-.2.4-.3.7-.3s.5,0,.7.3c.2.2.3.4.3.7s0,.5-.3.7-.4.3-.7.3ZM4,17c-.3,0-.5,0-.7-.3-.2-.2-.3-.4-.3-.7s0-.5.3-.7c.2-.2.4-.3.7-.3s.5,0,.7.3.3.4.3.7,0,.5-.3.7-.4.3-.7.3Z',
  location_on: 'M12,12c.6,0,1.1-.2,1.6-.7.4-.4.7-1,.7-1.6s-.2-1.1-.7-1.6-1-.7-1.6-.7-1.1.2-1.6.7-.7,1-.7,1.6.2,1.1.7,1.6c.4.4,1,.7,1.6.7ZM12,24c-3.3-2.7-5.7-5.3-7.3-7.6-1.6-2.3-2.4-4.5-2.4-6.5s.9-5.1,2.8-7C6.9.9,9.2,0,12,0s5.1.9,7,2.8c1.9,1.9,2.8,4.2,2.8,7s-.8,4.2-2.4,6.5c-1.6,2.3-4.1,4.9-7.3,7.6Z',
  map: 'M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z',
  multi_result: 'M9,4 L9,9 L16,9 L16,4 L9,4 Z M9,20 L16,20 L16,11 L9,11 L9,20 Z M0,20 L7,20 L7,15 L0,15 L0,20 Z M0,13 L7,13 L7,4 L0,4 L0,13 L0,13 Z',
  music_note: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
  navigate_next: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  newspaper: 'M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M20.33,4.67L18.67,3L17,4.67L15.33,3L13.67,4.67L12,3L10.33,4.67L8.67,3L7,4.67L5.33,3L3.67,4.67L2,3V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V3L20.33,4.67Z',
  open_in_new: 'M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
  photo: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
  photo_library: 'M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z',
  play_circle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z',
  remove_red_eye: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
  search: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  theaters: 'M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z',
  timeline: 'M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z',
  videogame_asset: 'M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  volume_up: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
  warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  web: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z'
};

const Icon = ({ d, icon, size = 16, style, title, ...rest }) => {
  let measurement = size;
  measurement += /^[0-9]+$/u.test(size) ? 'px' : '';
  return (
    <svg
      viewBox='0 0 24 24'
      style={{
        display: 'inline-block',
        fill: 'currentColor',
        height: measurement,
        verticalAlign: 'middle',
        width: measurement,
        ...style
      }}
      focusable='false'
      role={title ? 'img' : 'presentation'}
      {...rest}
    >
      {title && <title>{title}</title>}
      <path d={d || icons[icon]} />
    </svg>
  );
};

export default Icon;
