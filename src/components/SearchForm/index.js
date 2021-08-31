import React, { useState } from 'react';

function SearchForm({ onSubmit }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit({ keyword });
  };

  const handleChange = (ev) => {
    setKeyword(ev.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={keyword}
        onChange={handleChange}
        placeholder='Search a gif...'
      />
    </form>
  );
}

export default React.memo(SearchForm);
