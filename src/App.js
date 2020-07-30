import React from 'react';  

import data from "./data.json";
import ProductList from "./components/ProductList/ProductList";
import Filter from './components/Filter/Filter.js';
import Cart from './components/Cart/Cart.js';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: "",      
    }
  }
  createOrder = (order) => {
    alert("New Order created for "+ order.name );
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id)
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !== product._id)));

  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false; 
    cartItems.forEach(item => {
      if(item._id === product._id) {
        // Item exists in Cart, so we update item count
        item.count++;
        alreadyInCart = true; 
      }
    });
    /** If item does not exist in the cart */
    if(!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });      
    }
    /** Update the state for out Cart Items */
    this.setState({cartItems });   
    localStorage.setItem("cartItems", JSON.stringify(cartItems));  
    }

  sortProducts = (event) => {    
    const sort = event.target.value;
    this.setState(state => ({
      sort: sort,
      products: this.state.products
      .slice()
      .sort((a,b) =>
        sort === "lowest" ? a.price > b.price ? 1:-1
        :
        sort ==="highest" ? a.price < b.price ? 1: -1
        :
        a._id < b._id ? 1:-1
      )
    }));
   }

  filterProducts = (event)=> {
    if(event.target.value ===""){
      this.setState({ size:event.target.value, products:data.products});
    } else {
      this.setState({
      size: event.target.value, 
      products: data.products.filter(product => 
        product.availableSizes.indexOf(event.target.value) >= 0)
    });
    }    
  }

  render() {
    const { cartItems, products, size, sort } = this.state;
    return (
      <div className="grid-container">
        <header>
          <a href="/">Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={products.length}
                      size={size}
                      sort={sort}
                      filterProducts={this.filterProducts}
                      sortProducts={this.sortProducts} 
              />          
              <ProductList products={products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
            <Cart cartItems={cartItems} removeFromCart = {this.removeFromCart} createOrder={this.createOrder} /> 
            </div>
          </div>
        </main>
        <footer>All rights reserved</footer>
      </div>
    );
  }

  }
  

export default App;
