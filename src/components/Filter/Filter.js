import React, { Component } from 'react'

import './Filter.css';

 class Filter extends Component {
    render() {

        const { sort, size, count, sortProducts, filterProducts } = this.props;
        return (
            <div className="filter">
                <div className="filter-result">{count} products</div>
                <div className="filter-sort">Order {" "}
                <select value={sort} onChange={sortProducts}>
                    <option>Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
                </div>
                <div className="filter-size">Filter {" "}
                <select value={size} onChange={filterProducts}>
                    <option value="">ALL</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XLL</option>
                </select>
                </div>
            </div>
        )
    }
}

export default Filter;
