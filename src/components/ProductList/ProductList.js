import React from 'react'
import formatCurrency from '../../utils';

import './ProductList.css';

class ProductList extends React.Component {
    render() {
        const { addToCart } = this.props;
        return (
            <div>
                <ul className="products">
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#" + product._id}>
                                    <img src={product.image} alt={product.title} />
                                    <p>{product.title}</p>
                                </a>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button onClick={() => addToCart(product)} className="button primary">Add to Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>                
            </div>
        )
    }
}

export default ProductList;
