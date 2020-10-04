import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { products } from '../actions/userActions';
import { saveProduct } from '../actions/productActions';
function ProductsScreen(props) {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [inventory, setInventory] = useState('');
  const [description, setDescription] = useState('');

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const dispatch = useDispatch();

  useEffect(() => {

    return () => {
      //
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({ name, price, image, brand, category, inventory, description }));
  }


  return (
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Add New Item</h2>
          </li>
          <li>
            {loadingSave && <div>Loading</div>}
            {errorSave && <div>{errorSave}</div>}
          </li>
          {/* **** FORM START **** */}
          <li>
            <label htmlFor="name">
              Item Name:
            </label>
            <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
          </li>

          <li>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" onChange={(e) => setPrice(e.target.value)}></input>
          </li>

          <li>
            <label htmlFor="image">Image:</label>
            <input type="text" id="image" name="image" onChange={(e) => setImage(e.target.value)}></input>
          </li>

          <li>
            <label htmlFor="brand">Brand:</label>
            <input type="brand" id="brand" name="brand" onChange={(e) => setBrand(e.target.value)}></input>
          </li>

          <li>
            <label htmlFor="category">Category:</label>
            <input type="category" id="price" name="category" onChange={(e) => setCategory(e.target.value)}></input>
          </li>

          <li>
            <label htmlFor="inventory">Inventory:</label>
            <input type="number" id="inventory" name="inventory" onChange={(e) => setInventory(e.target.value)}></input>
          </li>

          <li>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
          </li>
          {/* **** FORM END **** */}
          <li>
            <button type="submit" className="button primary">Add Item</button>
          </li>
        </ul>
      </form>
    </div>
  )
}
export default ProductsScreen;
