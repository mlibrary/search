import React from 'react';

const SearchBox = function SearchBox() {
  return (
    <div className="search-box-container-full">
      <div className="container search-box-container">
        <form className="search-box">
          <input type="text" />
          <input className="button search-box-button" type="submit" value="Search" />
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
