import React, { Component } from "react";

import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";



import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import data from "./Data";
import Context from "./Context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      products: [],
      totalp:0
    };

    this.routerRef = React.createRef();
  }


handleChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.items;

      newList = currentList.filter(item => {
        const lc = item.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.items;
    }
    this.setState({
      filtered: newList
    });
  }


  addToCart = cartItem => {
    let cart = this.state.cart;
    let totalp = this.state.totalp;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    totalp += cart[cartItem.id].product.price;

    localStorage.setItem("totalp", JSON.stringify(totalp));

    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ totalp });
    
    this.setState({ cart });
  };



  removeFromCart = cartItemId => {
    let totalp = this.state.totalp;

    let cart = this.state.cart;
    var neg=cart[cartItemId].amount*cart[cartItemId].product.price;
    totalp -= neg;

    console.log(neg);
    delete cart[cartItemId];
    localStorage.setItem("totalp", JSON.stringify(totalp));
    localStorage.setItem("cart", JSON.stringify(cart));
        this.setState({ totalp });

    this.setState({ cart });
  };

  clearCart = () => {
    let totalp = this.state.totalp;

    let cart = {};
    totalp=0;
    localStorage.setItem("totalp", JSON.stringify(totalp));

    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
    this.setState({ totalp });

  };

  componentDidMount() {
    let products = localStorage.getItem("products");
    let cart = localStorage.getItem("cart");
    products = products ? JSON.parse(products) : data.initProducts;
    cart = cart ? JSON.parse(cart) : {};
    this.setState({ products, cart });
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          clearCart: this.clearCart,
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav
              className="navbar container"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <b className="navbar-item is-size-4 ">E-Commerce</b>

                <a
                  href="/"
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>
              <div
                className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}
              >
                <Link to="/products" className="navbar-item">
                  Products
                </Link>

                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>
   
              </div>




            </nav>

<br />


            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
