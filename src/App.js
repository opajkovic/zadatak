import React from 'react';
import { ProductContextProvider } from './store/product-context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, ProductItem, AddProduct, EditProduct, NotFound } from './components/pages'
import Header from './components/UI/Header';

function App() {
  return (
    <div className='container'>
      <ProductContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={< Home />} />
            <Route path="/products/:id" element={< ProductItem />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProductContextProvider>
    </div>
  );
}
export default App;
