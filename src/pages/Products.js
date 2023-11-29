import React from 'react';

function Products() {
  return (
    <div className='products'>
      <h1 className='products-heading'>Products</h1>
      <div className='product-card'>
        <h2>Steering Wheel Device</h2>
        <p>stuff</p>
        <span className='price'>$99.99</span>
        <button className='buy-button'>Buy Now</button>
      </div>
    </div>
  );
}

export default Products;
