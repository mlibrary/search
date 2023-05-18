import React from 'react';

const IndexPage = function DatastorePage () {
  return (
    <div>
      <div className='container container-narrow'>
        <p>Index page.</p>
        <p className='alert'>This application is running in <span className='strong'>{process.env.NODE_ENV}</span> mode.</p>
      </div>
    </div>
  );
};

export default IndexPage;
