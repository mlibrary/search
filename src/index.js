import './stylesheets/colors.css';
import './stylesheets/forms.css';
import './stylesheets/main.css';
import './stylesheets/spacing.css';
import './stylesheets/utilities.css';
import { AboutLibrarySearch, AccessibilityPage, NoMatch } from './modules/pages';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Footer, ScrollToTop, SearchHeader } from './modules/core';
import { A11yLiveMessage } from './modules/a11y';
import { Alert } from './modules/reusable';
import { DatastoreRoute } from './modules/datastores';
import { initializePride } from './modules/pride';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='site-wrapper'>
          <A11yLiveMessage />
          <ScrollToTop />
          <SearchHeader />
          <Routes>
            <Route
              path='/'
              element={<Navigate to='/everything' replace />}
            />
            <Route
              path='librarywebsite/*'
              element={<Navigate to='/guidesandmore' replace />}
            />
            <Route
              path='about-library-search'
              element={<AboutLibrarySearch />}
            />
            <Route
              path='technical-overview/*'
              element={<Navigate to='/about-library-search' replace />}
            />
            <Route
              path='accessibility'
              element={<AccessibilityPage />}
            />
            <Route path=':datastoreSlug/*' element={<DatastoreRoute />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

const renderPrideFailedToLoad = () => {
  root.render(
    <Alert type='error'>
      U-M Library Search is not available. We will fix this issue as soon as we can.
    </Alert>
  );
};

initializePride();

export {
  renderApp,
  renderPrideFailedToLoad
};
