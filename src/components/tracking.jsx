import "./styles/shared/general.css";
import "./styles/shared/amazon-header.css";
import "./styles/pages/tracking.css";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useParams } from "react-router-dom";

export function Tracking() {
  const { orderId } = useParams();
  const { cartQuantity, orders } = useCart();

  if (!orders[orderId]) {
    return <div>Loading...</div>;
  }

  const tracking = orders[orderId].cartItems;
  const arriveDate = orders[orderId].date;

  return (
    <>
      <div className='amazon-header'>
        <div className='amazon-header-left-section'>
          <Link to='/' className='header-link'>
            <img
              className='amazon-logo'
              src='/src/images/amazon-logo-white.png'
              alt='Amazon Logo'
            />
            <img
              className='amazon-mobile-logo'
              src='/src/images/amazon-mobile-logo-white.png'
              alt='Amazon Mobile Logo'
            />
          </Link>
        </div>

        <div className='amazon-header-middle-section'>
          <input className='search-bar' type='text' placeholder='Search' />

          <button className='search-button'>
            <img
              className='search-icon'
              src='/src/images/icons/search-icon.png'
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
              src='/src/images/icons/cart-icon.png'
              alt='Cart Icon'
            />
            <div className='cart-quantity'>{cartQuantity}</div>
            <div className='cart-text'>Cart</div>
          </Link>
        </div>
      </div>
      <div className='main'>
        <div className='order-tracking'>
          <Link className='back-to-orders-link link-primary' to='/orders'>
            View all orders
          </Link>

          <div className='delivery-date'>Arriving on {arriveDate}</div>
          {tracking.map((order, index) => {
            return (
              <div key={index}>
                <div className='product-info'>{order.productName}</div>
                <div className='product-info'>Quantity: {order.quantity}</div>
                <img
                  className='product-image'
                  src={"/" + order.productImage}
                  alt='Product Image'
                />
              </div>
            );
          })}

          <div className='progress-labels-container'>
            <div className='progress-label'>Preparing</div>
            <div className='progress-label current-status'>Shipped</div>
            <div className='progress-label'>Delivered</div>
          </div>

          <div className='progress-bar-container'>
            <div className='progress-bar'></div>
          </div>
        </div>
      </div>
    </>
  );
}
