import React from 'react';
import data from '../data'
import Typeahead from './Typeahead'
import GlobalStyles from './GlobalStyles';

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      <div className='wrapper'>
      <Typeahead
        genre={data.categories}
        books={data.books}
        handleSelect={(suggestion) => {
          window.alert(suggestion)
        }}
      />
      </div>
    </>
  );
};

export default App;
