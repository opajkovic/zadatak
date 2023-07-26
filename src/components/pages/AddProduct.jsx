import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import classes from './AddProduct.module.css';
import { ProductContext } from '../../store/product-context';

const isNotEmpty = (value) => value.trim() !== '';
const isShort = (value) => value.trim() !== '' && value.length > 10;
const isNotNumber = (value) => value.trim() !== '' && /^-?\d+(\.\d+)?$/.test(value);

const AddItem = (props) => {
  const { setItems } = useContext(ProductContext);
  const navigate = useNavigate();

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);
  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isShort);
  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput(isNotNumber);
  const {
    value: imageValue,
    isValid: imageIsValid,
    hasError: imageHasError,
    valueChangeHandler: imageChangeHandler,
    inputBlurHandler: imageBlurHandler,
    reset: resetImage,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (titleIsValid && descriptionIsValid && priceIsValid) {
    formIsValid = true;
  }
  const i = 30 + Math.floor(Math.random() * 100) + 1
  const submitHandler = (event) => {
    event.preventDefault();
    const item = {
      id: i,
      title: titleValue,
      description: descriptionValue,
      price: priceValue,
      image: imageValue
    }
    setItems(prevState => [...prevState, item])
    navigate('/');
    if (!formIsValid) {
      return;
    }

    resetTitle();
    resetDescription();
    resetPrice();
    resetImage();
  };

  const titleClasses = titleHasError ? `${classes.formControl} ${classes.invalid}` : `${classes.formControl}`;
  const descriptionClasses = descriptionHasError ? `${classes.formControl} ${classes.invalid}` : `${classes.formControl}`;
  const priceClasses = priceHasError ? `${classes.formControl} ${classes.invalid}` : `${classes.formControl}`;
  const imageClasses = imageHasError ? `${classes.formControl} ${classes.invalid}` : `${classes.formControl}`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controlGroup}>
        <div className={titleClasses}>
          <label htmlFor='name'>Title</label>
          <input
            type='text'
            id='name'
            value={titleValue}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
          {titleHasError && <p className={classes.errorText}>Please enter a title</p>}
        </div>
        <div className={descriptionClasses}>
          <label htmlFor='name'>Description</label>
          <input
            type='text'
            id='name'
            value={descriptionValue}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          />
          {descriptionHasError && <p className={classes.errorText}>Please enter a description.</p>}
        </div>
    
      <div className={priceClasses}>
        <label htmlFor='name'>Price</label>
        <input
          type='text'
          id='name'
          value={priceValue}
          onChange={priceChangeHandler}
          onBlur={priceBlurHandler}
        />
        {priceHasError && <p className={classes.errorText}>Please enter a price.</p>}
      </div>
      <div className={imageClasses}>
        <label htmlFor='name'>Image</label>
        <input
          type='file'
          id='name'
          value={imageValue}
          onChange={imageChangeHandler}
          onBlur={imageBlurHandler}
          // accept="image/*"
        />
        {imageHasError && <p className={classes.errorText}>Please import an image</p>}
      </div>
      </div>
      <div className={classes.formActions}>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default AddItem;

