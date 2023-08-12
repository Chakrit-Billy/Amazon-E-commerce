import "./styles/shared/general.css";
import "./styles/shared/amazon-header.css";
import "./styles/pages/orders.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export function Orders() {
  const navigate = useNavigate();
  let { cartQuantity, orders, setCartItems } = useCart();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  console.log(orders);
  return (
    <>
      <div className='amazon-header'>
        <div className='amazon-header-left-section'>
          <Link to='/' className='header-link'>
            <img
              className='amazon-logo'
              src='src/images/amazon-logo-white.png'
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
          <Link className='orders-link header-link' to='/'>
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
        <div className='page-title'>Your Orders</div>
        <div className='orders-grid'>
          {orders.map((order, i) => (
            <div className='order-container' key={i}>
              <div className='order-header'>
                <div className='order-header-left-section'>
                  <div className='order-date'>
                    <div className='order-header-label'>Order Placed:</div>
                    <div>{formattedDate}</div>
                  </div>
                  <div className='order-total'>
                    <div className='order-header-label'>Total:</div>
                    <div>${order.total.toFixed(2)}</div>
                  </div>
                </div>
                <div className='order-header-right-section'>
                  <div className='order-header-label'>Order ID:</div>
                  <div>{i}</div>
                </div>
              </div>
              <div className='order-details-grid'>
                {order.cartItems.map((cartItem) => (
                  // Wrap the following elements in a JSX fragment
                  <>
                    <div className='product-image-container'>
                      <img src={cartItem.productImage} alt='Product' />
                    </div>
                    <div className='product-details'>
                      <div className='product-name'>{cartItem.productName}</div>
                      <div className='product-delivery-date'>
                        Arriving on: {order.date.split(",")[1]}
                      </div>
                      <div className='product-quantity'>
                        Quantity: {cartItem.quantity}
                      </div>
                      <button className='buy-again-button button-primary'>
                        <img
                          className='buy-again-icon'
                          src='src/images/icons/buy-again.png'
                          alt='Buy Again Icon'
                        />
                        <span
                          className='buy-again-message'
                          onClick={() => {
                            navigate("/checkout");
                            console.log(order.cartItems);
                            setCartItems(order.cartItems);
                          }}>
                          Buy it again
                        </span>
                      </button>
                    </div>
                    <div className='product-actions'>
                      <Link to={`/tracking/${i}`}>
                        <button className='track-package-button button-secondary'>
                          Track package
                        </button>
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
