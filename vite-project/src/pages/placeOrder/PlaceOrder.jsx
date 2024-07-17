import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)
  return (
    <div>
      <form className='place-order'>
        <div className="place-order-left">
            <p className='title'> Delivery Information</p>
            <div className='multi-field'>
              <input type="text" placeholder='first name'/>
              <input type="text" placeholder='last name' />
            </div>

            <input type="text" placeholder='Email'/>
            <input type="text" placeholder='Street'/>

            <div className='multi-field'>
              <input type="text" placeholder='City'/>
              <input type="text" placeholder='State' />
            </div>

            <div className='multi-field'>
              <input type="text" placeholder='Zipcode'/>
              <input type="text" placeholder='Country' />
            </div>

            <input type="text" placeholder='phone no' />
        </div >
        <div className="place-order-right">
                 <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button  onClick={()=>navigate('/PlaceOrder')}>Proceed to checkout</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
