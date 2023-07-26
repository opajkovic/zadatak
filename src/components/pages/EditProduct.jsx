import { useState, useContext } from 'react';
import classes from './EditProduct.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../../store/product-context';

const EditProduct = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const { items,setItems } = useContext(ProductContext);
  const item = items.find((i) => i.id === Number(id));
  const [itemUpdate, setItemUpdate] = useState({
    id: id,
    title: item.title,
    description:item.description ,
    price: item.price,
    thumbnail: item.thumbnail,
    images: item.images,  
  });

 
const changeHandler = (e) => {
    const { name, value } = e.target;
    
    setItemUpdate({ ...itemUpdate, [name]: value })
   
}
  const submitHandler = (e) => {
   e.preventDefault();
   setItems(prevItems => {
    return prevItems.map( p => { 
      if (p.id == itemUpdate.id) {
        return { ...p, title: itemUpdate.title, description: itemUpdate.description, price:itemUpdate.price}
      } else {
        return p;
        
      }
    })
  })
    navigate('/');
}

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controlGroup}>
        <div className={classes.formControl}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            name="title"
            value={itemUpdate.title}
            onChange={(e) => changeHandler(e)}
          />
        </div>
         <div className={classes.formControl}>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            id='description'
            name='desciption'
            value={itemUpdate.description}        
              onChange={(e) => changeHandler(e)}
          />
        </div>  
      <div className={classes.formControl}>
        <label htmlFor='price'>Price</label>
        <input
          type='text'
          id='price'
          name='price'
          value={itemUpdate.price}
          onChange={(e) => changeHandler(e)}
        />
      </div>
    </div>
      <div className={classes.formActions}>
        <button >Submit</button>
      </div>

    </form>
  )
}

export default EditProduct;

