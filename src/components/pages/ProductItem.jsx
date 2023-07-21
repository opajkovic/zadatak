import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../store/product-context';
import Loader from './Loader';

const ProductItem = () => {
  const id = useParams().id;
  const { items } = useContext(ProductContext);
  const item = items[id];
  if (!item?.images.length) return <Loader />;
  return (
    <>
      <h2>{item.title}</h2>
      <div className='container products'>
        {item.images.slice(0, 3).map((image, index) => (
          <div className="product" key={index}>

            <img src={`${image}`} alt={`${item.title}`} />
          </div>))}
      </div>
      <br />
      <h4>description:</h4>
      <p>{item.description}</p>
      <br />
      <h4>price:</h4>
      <p>{item.price}$</p>
    </>
  )
}
export default ProductItem;
