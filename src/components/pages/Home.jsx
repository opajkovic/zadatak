import React, { useContext, useState } from 'react';
import { ProductContext } from '../../store/product-context';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Home = () => {
  const { items, setItems } = useContext(ProductContext);
  const [counter, setCounter] = useState(9);
  const navigate = useNavigate();

  if (!items?.length) return <Loader />;

  const loadingHandler = () => {
    setCounter((prevState) => prevState + 9)
  }
  const handleView = (id) => {
    navigate(`./products/${id}`)
  }

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  }
  const handleEdit = (id) => {
    navigate(`./products/edit/${id}`)
  }

  return (
    <div className='container products' >
      {items.slice(0, `${counter}`)?.map((item) => (
        <div className="product" key={item.id}>
          <img src={`${item.thumbnail}`} alt={`${item.title}`} />
          <div className="title">{item.title}</div>
          <div className="price"> {item.price}$</div>
          <div className='buttons'>
            <button className='button' onClick={() => handleView(item.id)}> View</button>
            <button className='button' onClick={() => handleEdit(item.id)}>Edit</button>
            <button className='button' onClick={() => handleDelete(item.id)} >Delete</button>
          </div>
        </div>
      ))}
      <br />
      {counter < items.length && <button onClick={loadingHandler}>Loading more...</button>}
    </div>
  )
}
export default Home;
