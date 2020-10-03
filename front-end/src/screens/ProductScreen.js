import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {

  const [qty, setQty] = useState(1)
  const productDetails = useSelector(state => state.productDetails);
  const {product, loading, error} = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);

  const handleAddToCard = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
  }


  return <div>
    <div className="back-to-result">
      <Link to="/">Back to result</Link>
    </div>
    {loading ? <div>Loading...</div> :
    error ? <div>{error}</div> :
    (<div className="details">
        <div className="details-image">
          <img src={product.image} alt="product" ></img>
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price: <b>${product.price}</b>
            </li>
            <li>
              Description:
              <div>
                {product.description}
              </div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>
              Price: ${product.price}
            </li>
            <li>
              Status: {product.inventory > 0 ? "In Stock Now" : "Currently Unavailable"}
            </li>
            <li>
              Qty: <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                {[...Array(product.inventory).keys()].map(x => <option key={x+1} value={x+1}>{x+1}</option>
                )}
              </select>
            </li>
            <li>
              {product.inventory > 0 ? <button className="button primary" onClick={handleAddToCard}>Add to Cart</button> :
              <div>Out of Stock</div>
              }
            </li>
          </ul>
        </div>
      </div>)
    }
  </div>
}
export default ProductScreen;
