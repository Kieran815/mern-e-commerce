import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import { useSelector } from 'react-redux';

function App() {

  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">MERN E-Commerce</Link>
          </div>
          <div className="header-links">
            <a href="cart/">Cart</a>
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
              <Link to="/signin">Sign In</Link>
            }
          </div>
        </header>

        {/* **** SIDEBAR **** */}
        <aside className="sidebar">
          <h3>Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>X</button>
          <ul>
            <li>
              <a href="index.html">Category 1</a>
            </li>
            <li>
              <a href="index.html">Category 2</a>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content"> {/* Change Routes to display custom landing page, etc. */}
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen} />

          </div>
        </main>

        <footer className="footer">
          Copyrights and some-such
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
