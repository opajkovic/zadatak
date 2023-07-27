import { useContext } from 'react';
import classes from './EditProduct.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../../store/product-context';
import { Formik } from 'formik';

const EditProduct = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const { items, setItems } = useContext(ProductContext);
  const item = items.find((i) => i.id === Number(id));

  return (
    <>
      <Formik initialValues={{
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price
      }}
        onSubmit={(values) => {
          const { id, title, description, price } = values;
          setItems(prevItems => {
            return prevItems.map(p => {
              if (p.id === +id) {
                return { ...p, title: title, description: description, price: price }
              } else {
                return p;
              }
            })
          })
          navigate('/');
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) { errors.title = "Please enter a title"; }
          else if (values.title.length < 3) { errors.title = "Title is to short"; }
          else if (values.title.length > 20) { errors.title = "Title is to long"; }
          else if (!/^[A-Za-z0-9 ]*$/i.test(values.title)) {
            errors.title = "Use only letters or numbers";
          }
          if (!values.description) { errors.description = "Please enter a description"; }
          if (!values.price) { errors.price = "Please enter a price"; }
          else if (!/^-?\d+(\.\d+)?$/.test(values.price)) { errors.price = "Use only a numbers "; }
          return (errors);
        }}
      >
        {({
          values,
          handleSubmit,
          isValid,
          isSubmitting,
          handleBlur,
          handleChange,
          touched,
          errors
        }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.controlGroup}>
              <div className={classes.formControl}>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  id='title'
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.title && errors.title ? "error" : null}
                />
                {touched.title && errors.title
                  ? (<div className="error-message">{errors.title}</div>) : null}
              </div>
              <div className={classes.formControl}>
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  id='description'
                  name='description'
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.description && errors.description ? "error" : null}
                />
                {touched.description && errors.description
                  ? (<div className="error-message">{errors.description}</div>) : null}
              </div>
              <div className={classes.formControl}>
                <label htmlFor='price'>Price</label>
                <input
                  type='text'
                  id='price'
                  name='price'
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.price && errors.price ? "error" : null}
                />
                {touched.price && errors.price
                  ? (<div className="error-message">{errors.price}</div>) : null}
              </div>
            </div>
            <div className={classes.formActions}>
              <button type="submit" disabled={!(isValid) || isSubmitting}>Submit</button>
            </div>

          </form>
        )}
      </Formik>
    </>
  )
}

export default EditProduct;

