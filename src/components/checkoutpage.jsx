import "./styles/shared/general.css";
import "./styles/pages/checkout/checkout-header.css";
import "./styles/pages/checkout/checkout.css";
import { useDateContext } from "./DateProvider.jsx";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { dateFunc } = useDateContext();
  const dateString1 = dateFunc(1);
  const dateString2 = dateFunc(2);
  const dateString3 = dateFunc(3);
  let {
    cartItems,
    setCartItems,
    selectedQuantity,
    shipPing,
    setShipPing,
    date,
    setDate,
    setCartQuantity,
    orders,
    setOrders,
  } = useCart();
  const handleQuantityChange = (event) => {
    const value = event.target.value;
    const [date1, price] = value.split(" - ");
    setDate(date1);
    setShipPing(price);
  };

  const totalItemsPrice = cartItems.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );

  const shippingPrice = !isNaN(shipPing) ? Number(shipPing) : 0;
  const totalItemsPriceTax = totalItemsPrice + shippingPrice;
  const total = totalItemsPriceTax + totalItemsPriceTax / 10;

  return (
    <div>
      <div className='checkout-header'>
        <div className='header-content'>
          <div className='checkout-header-left-section'>
            <Link to='/'>
              <img
                className='amazon-logo'
                src='src/images/amazon-logo.png'
                alt='Amazon Logo'
              />
              <img
                className='amazon-mobile-logo'
                src='src/images/amazon-logo-white.png'
                alt='Amazon Mobile Logo'
              />
            </Link>
          </div>

          <div className='checkout-header-middle-section'>
            Checkout (
            <a className='return-to-home-link' href='amazon.html'>
              {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
              items
            </a>
            )
          </div>

          <div className='checkout-header-right-section'>
            <img
              src='src/images/icons/checkout-lock-icon.png'
              alt='Checkout Lock Icon'
            />
          </div>
        </div>
      </div>

      <div className='main'>
        <div className='page-title'>Review your order</div>

        <div className='checkout-grid'>
          <div className='order-summary'>
            {cartItems.map((item, i) => {
              console.log(selectedQuantity);
              return (
                <>
                  <div className='cart-item-container' key={i}>
                    <div className='delivery-date'>Delivery date: {date}</div>
                    <div className='cart-item-details-grid'>
                      <img
                        className='product-image'
                        src={item.productImage}
                        alt='Product Image'
                      />

                      <div className='cart-item-details'>
                        <div className='product-name'>{item.productName}</div>
                        <div className='product-price'>$10.90</div>
                        <div className='product-quantity'>
                          <span>
                            Quantity:{" "}
                            <span className='quantity-label'>
                              {item.quantity}
                            </span>
                          </span>

                          <span
                            className='update-quantity-link link-primary'
                            onClick={() => navigate("/")}>
                            Update
                          </span>

                          <span
                            className='delete-quantity-link link-primary'
                            onClick={() => {
                              const updatedCart = cartItems.filter(
                                (_, index) => index !== i
                              );
                              setCartItems(updatedCart);
                            }}>
                            Delete
                          </span>
                        </div>
                      </div>
                      <div className='delivery-options'>
                        <div className='delivery-options-title'>
                          Choose a delivery option:
                        </div>
                        <div className='delivery-option'>
                          <input
                            type='radio'
                            checked
                            className='delivery-option-input'
                            name='delivery-option-1'
                            value={dateString1}
                            onClick={(e) => handleQuantityChange(e)}
                          />
                          <div>
                            <div className='delivery-option-date'>
                              {dateString1.split(" - ")[0]}
                            </div>
                            <div className='delivery-option-price'>
                              FREE Shipping
                            </div>
                          </div>
                        </div>
                        <div className='delivery-option'>
                          <input
                            type='radio'
                            className='delivery-option-input'
                            name='delivery-option-1'
                            value={dateString2}
                            onClick={(e) => handleQuantityChange(e)}
                          />
                          <div>
                            <div className='delivery-option-date'>
                              {dateString2.split(" - ")[0]}
                            </div>
                            <div className='delivery-option-price'>
                              $4.99 - Shipping
                            </div>
                          </div>
                        </div>
                        <div className='delivery-option'>
                          <input
                            type='radio'
                            className='delivery-option-input'
                            name='delivery-option-1'
                            value={dateString3}
                            onClick={(e) => handleQuantityChange(e)}
                          />
                          <div>
                            <div className='delivery-option-date'>
                              {dateString3.split(" - ")[0]}
                            </div>
                            <div className='delivery-option-price'>
                              $9.99 - Shipping
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <div className='payment-summary'>
            <div className='payment-summary-title'>Order Summary</div>

            <div className='payment-summary-row'>
              <div>
                Items (
                {cartItems.reduce((total, item) => total + item.quantity, 0)}):
              </div>
              <div className='payment-summary-money'>
                ${totalItemsPrice.toFixed(2)}
              </div>
            </div>

            <div className='payment-summary-row'>
              <div>Shipping &amp; handling:</div>
              <div className='payment-summary-money'>${shipPing}</div>
            </div>

            <div className='payment-summary-row subtotal-row'>
              <div>Total before tax:</div>
              <div className='payment-summary-money'>
                ${totalItemsPriceTax.toFixed(2)}
              </div>
            </div>

            <div className='payment-summary-row'>
              <div>Estimated tax (10%):</div>
              <div className='payment-summary-money'>
                ${(totalItemsPriceTax / 10).toFixed(2)}
              </div>
            </div>

            <div className='payment-summary-row total-row'>
              <div>Order total:</div>
              <div className='payment-summary-money'>${total.toFixed(2)}</div>
            </div>

            <button
              className='place-order-button button-primary'
              onClick={() => {
                const newOrder = {
                  cartItems,
                  shippingPrice,
                  totalItemsPrice,
                  totalItemsPriceTax,
                  total,
                  date,
                };

                setOrders([...orders, newOrder]); // Add the new order to the orders array
                setCartItems([]); // Clear the cartItems
                setCartQuantity(0);
                navigate("/orders");
              }}>
              Place your order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
