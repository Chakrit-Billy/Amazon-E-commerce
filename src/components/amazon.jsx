import "./styles/pages/amazon.css";
import "./styles/shared/amazon-header.css";
import "./styles/shared/general.css";
import { Products } from "../data/products";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

function Amazon() {
  const { cartItems, setCartItems } = useCart();
  const { cartQuantity, setCartQuantity } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = (
    productId,
    productName,
    productImage,
    productPrice
  ) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      const updatedCart = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + selectedQuantity };
        }
        return item;
      });
      setCartItems(updatedCart); // Use setCartItems to update the cart
    } else {
      // Similar to your existing logic, add a new item
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        {
          productId,
          quantity: selectedQuantity,
          productName,
          productImage,
          productPrice,
        },
      ]);
    }
  };

  useEffect(() => {
    let totalQuantity = 0;
    for (const item of cartItems) {
      totalQuantity += item.quantity;
    }
    setCartQuantity(totalQuantity);
  }, [cartItems]);

  return (
    <>
      <div className='amazon-header'>
        <div className='amazon-header-left-section'>
          <Link to='/' className='header-link'>
            <img
              className='amazon-logo'
              src='public/images/amazon-logo-white.png'
              alt='Amazon Logo'
            />
            <img
              className='amazon-mobile-logo'
              src='src/images/amazon-mobile-logo-white.png'
              alt='Amazon Mobile Logo'
            />
          </Link>
        </div>

        <div className='amazon-header-middle-section'>
          <input className='search-bar' type='text' placeholder='Search' />

          <button className='search-button'>
            <img
              className='search-icon'
              src='src/images/icons/search-icon.png'
              alt='Search Icon'
            />
          </button>
        </div>

        <div className='amazon-header-right-section'>
          <Link className='orders-link header-link' to='/orders'>
            <span className='returns-text'>Returns</span>
            <span className='orders-text'>& Orders</span>
          </Link>

          <Link className='cart-link header-link' to='/checkout'>
            <img
              className='cart-icon'
              src='src/images/icons/cart-icon.png'
              alt='Cart Icon'
            />
            <div className='cart-quantity'>{cartQuantity}</div>
            <div className='cart-text'>Cart</div>
          </Link>
        </div>
      </div>

      <div className='main'>
        <div className='products-grid'>
          {Products.map((product, index) => {
            let img = `src/${product.image}`;
            let s = product.rating.stars * 10;
            let star = `src/images/ratings/rating-${s}.png`;
            let price = product.priceCents / 100;
            return (
              <>
                <div className='product-container'>
                  <div className='product-image-container' key={index}>
                    <img className='product-image' src={img} alt='Product 1' />
                  </div>
                  <div className='product-name limit-text-to-2-lines'>
                    {product.name}
                  </div>
                  <div className='product-rating-container'>
                    <img
                      className='product-rating-stars'
                      src={star}
                      alt='Product 1 Rating'
                    />
                    <div className='product-rating-count link-primary'>
                      {product.rating.count}
                    </div>
                    <div className='product-price'>${price.toFixed(2)}</div>
                    <div className='product-quantity-container'>
                      <select>
                        <option>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                      </select>
                    </div>
                    <div className='product-spacer'></div>

                    <div className='added-to-cart'>
                      <img
                        src='src/images/icons/checkmark.png'
                        alt='Added to Cart'
                      />
                      Added
                    </div>

                    <button
                      className='add-to-cart-button button-primary'
                      onClick={() => {
                        handleAddToCart(
                          product.id,
                          product.name,
                          `src/${product.image}`,
                          (product.priceCents / 100).toFixed(2)
                        ); // Pass selectedQuantity here
                        setSelectedQuantity(1); // Reset selected quantity after adding to cart// Pass selectedQuantity here
                      }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Amazon;
