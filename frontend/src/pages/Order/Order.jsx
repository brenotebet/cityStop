import React, { useContext, useEffect, useState } from 'react';
import './Order.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

const Order = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });

  const [emailError, setEmailError] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const validateEmail = () => {
    if (!validator.isEmail(data.email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!validateEmail()) {
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while placing the order.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Informações de Entrega</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Nome' />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Sobrenome' />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          onBlur={validateEmail}
          value={data.email}
          type="email"
          placeholder='Email'
        />
        {emailError && <p className="error">{emailError}</p>}
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Rua e Número' />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='Cidade' />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='Estado' />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='CEP' />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Celular' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>R${getTotalCartAmount().toString().substring(0,6)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Taxa de entrega</p>
              <p>R${(getTotalCartAmount() === 0 ? 0 : 2).toString().substring(0,6)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>R${(getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2).toString().substring(0,6)}</b>
            </div>
          </div>
          <button type='submit'>Prosseguir para o pagamento</button>
        </div>
      </div>
    </form>
  );
};

export default Order;
