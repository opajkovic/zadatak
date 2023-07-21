import { useState, useContext } from 'react';
import classes from './EditProduct.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../../store/product-context';

const EditProduct = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const { items, setItems } = useContext(ProductContext);
  const item = items[id];
  const [itemUpdate, setItemUpdate] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setItemUpdate({ ...itemUpdate, [name]: value })
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const itemUpdate = {

    }
    setItems(prevState => [...prevState, itemUpdate])
    navigate('/');
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controlGroup}>
        <div className={classes.formControls}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            value={item.title}
            onChange={changeHandler}
          />
        </div>
        <div className={classes.formControl}>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            id='description'
            value={item.description}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className={classes.formControl}>
        <label htmlFor='price'>Price</label>
        <input
          type='text'
          id='price'
          value={item.price}
          onChange={changeHandler}
        />
      </div>
      <div className={classes.formControl}>
        <label htmlFor='image'>Image</label>
        <input
          type='file'
          id='image'
          value={item.thumbnail}
          onChange={changeHandler}
          accept="image/*"
        />
      </div>
      <div className={classes.formActions}>
        <button >Submit</button>
      </div>
    </form>
  )
}

export default EditProduct;
