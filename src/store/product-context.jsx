import React, {createContext, useEffect, useState} from 'react';
import {fetchItems} from '../api';

const ProductContext = createContext({
  items: [],
  status: false,
  error:'',

});

const ProductContextProvider = ({children}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems()
      .then(data => setItems(data.products))
      .catch(err => console.error(err));
    // eslint-disable-next-line
  }, [])

// const addItems = (item) => {
//   setItems((prevState) => [...prevState, item])
// }

  const state = {items, setItems}

  return (
    <ProductContext.Provider value={state}>
      {children}
    </ProductContext.Provider>
  )
}
export {ProductContext, ProductContextProvider};