import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const {cartItems,food_list,removeFromCart, getTotalCartAmount, url} = useContext(StoreContext)
    const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Itens</p>
          <p>Nome</p>
          <p>Preço</p>
          <p>Qtd</p>
          <p>Total</p>
          <p>Remover</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item, index) => {
            if(cartItems[item._id]>0)
              { 
                  return(
                    <div>
                      <div className="cart-items-title cart-items-item">
                        <img src={url+"/images/"+item.image} alt="" />
                        <p>{item.name}</p>
                        <p>R${item.price}</p>
                        <p>{cartItems[item._id]}</p>
                        <p>R${(item.price*cartItems[item._id]).toString().substring(0,6)}</p>
                        <p onClick= {() => removeFromCart(item._id)} className='cross'>x</p>
                      </div>

                    </div>
                  )
              }
        })}
                      <div className="cart-bottom">
                        <div className="cart-total">
                          <h2>Total</h2>
                          <div>
                            <div className="cart-total-details">
                              <p>Subtotal</p>
                              <p>R${getTotalCartAmount().toString().substring(0,6)}</p>
                            </div>
                            <hr/>
                            <div className="cart-total-details">
                              <p>Taxa de entrega</p>
                              <p>R${getTotalCartAmount() === 0?0:2}</p>
                            </div>
                            <hr/>
                            <div className="cart-total-details">
                              <b>Total</b>
                              <b>R${(getTotalCartAmount()===0?0:getTotalCartAmount()+2).toString().substring(0,6)}</b>
                            </div>
                          </div>
                          <button onClick={() => navigate('/order')}>Prosseguir para o checkout</button>
                        </div>
                      </div>
      </div>
    </div>
  )
}

export default Cart