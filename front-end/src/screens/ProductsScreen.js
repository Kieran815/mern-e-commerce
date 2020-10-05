import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';


function ProductsScreen(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [inventory, setInventory] = useState('');
  const [description, setDescription] = useState('');

  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    // watch for errors here...
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setInventory(product.inventory);
    setDescription(product.description);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
      _id: id,
      name, price, image, brand, category, inventory, description
    }));
  }

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  }

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>Create product</button>
      </div>
      {modalVisible &&
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
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>
              </li>

              <li>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
              </li>

              <li>
                <label htmlFor="image">Image:</label>
                <input type="text" id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)}></input>
              </li>

              <li>
                <label htmlFor="brand">Brand:</label>
                <input type="brand" id="brand" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
              </li>

              <li>
                <label htmlFor="category">Category:</label>
                <input type="category" id="price" name="category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
              </li>

              <li>
                <label htmlFor="inventory">Inventory:</label>
                <input type="number" id="inventory" name="inventory" value={inventory} onChange={(e) => setInventory(e.target.value)}></input>
              </li>

              <li>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </li>
              {/* **** FORM END **** */}
              <li>
                <button type="submit" className="button primary">{id ? "Update Item" : "Add Item"}</button>
              </li>
              <li>
                <button type="button" className="button secondary" onClick={() => {setModalVisible(false)}}>Go Back</button>
              </li>
            </ul>
          </form>
        </div>
      }



      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button className="button" onClick={() => openModal(product)}>Edit</button>
                    {' '}
                    <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
export default ProductsScreen;
