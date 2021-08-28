import React from 'react';

const initialContextWithoutProvider = {
  name: 'react-gifs',
  dataAContextear: false,
};
const Context = React.createContext(initialContextWithoutProvider);

export default Context;
