import React from 'react';

const IndexPage = function DatastorePage () {
  return (
    <div>
      <div className='container container-narrow'>
        <p>Index page.</p>

        <p className='alert'>This application is running in <b>{process.env.NODE_ENV}</b> mode.</p>
      </div>
    </div>
  );
};

export default IndexPage;
