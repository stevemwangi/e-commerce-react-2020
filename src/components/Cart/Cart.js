import React, { Component } from 'react';
import formatCurrency from '../../utils';
import Fade from 'react-reveal/Fade';

import './Cart.styles.css';

class Cart extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "", 
            showCheckout: false
        }
    }
    handleInput = (e) => {        
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems
        }; 
        this.props.createOrder(order);
    }
    render() {
        const { cartItems, removeFromCart } = this.props;  
        return (             
            <div>  
                {
                    cartItems.length === 0 ?
                     (
                    <div className="cart cart-header"> The Cart is Empty </div>
                    ) 
                    :
                     (
                    <div className="cart cart-header">
                        You have {cartItems.length} items in the cart {" "} 
                    </div>
                    )
                } 
            <div> 
            <div className="cart">
                <Fade left cascade>
                <ul className="cart-items">
                    {
                        cartItems.map((item )=> 
                             ( 
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}></img>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)} * {item.count} {" "}
                                        <button className="button" onClick={() => removeFromCart(item)}>
                                        Remove
                                    </button>
                                    </div>
                                    
                                </div>
                            </li>
                            ))
                             }
                </ul>
                </Fade>
            </div>
            {
                cartItems.length !==0 && (
                    <div>
                <div className="cart">
                    <div className="total">
                        <div>
                            Total:  {" "}
                            {
                                formatCurrency(cartItems.reduce((a,c) => a+(c.price*c.count), 0))
                            }
                        </div>
                        <button 
                        className="button primary" 
                        onClick = {() => {
                            this.setState({ showCheckout: true });
                            }}>
                            Proceed
                        </button>
                    </div>
                </div>
                
                {this.state.showCheckout && (
                    <div className="cart">
                        <Fade right cascade>
                        <form onSubmit={this.createOrder}>
                            <ul className="form-container">
                                <li>
                                    <label>Email {" "}</label>
                                    <input type="email"
                                            name="email"
                                            required
                                            onChange={this.handleInput}
                                         />
                                </li>
                                <li>
                                    <label>Name</label>
                                    <input type="text"
                                            name="name"
                                            required
                                            onChange={this.handleInput}
                                         />
                                </li>
                                <li>
                                    <label>Address</label>
                                    <input type="text"
                                            name="address"
                                            required
                                            onChange={this.handleInput}
                                         />
                                </li> 
                                <br></br>
                                <li>
                                    <button className="button primary" type="submit">CheckOut</button>
                                </li>
                            </ul>                             
                        </form>
                        </Fade>
                    </div>                    
                )}
                </div>
                )
            }            
            </div>  
            </div>
        );
    }
}

export default Cart;
