import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'


const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {

    const response = await axios.get(url+"/api/order/list")

    if (response.data.success) {
      const paidOrders = response.data.data.filter(order => order.payment);
      setOrders(paidOrders);
      console.log(response.data.data);
    }
    else
    {
      toast.error("Erro")
    }
  }

  const fetchUnfinishedAllOrders = async () => {

    const response = await axios.get(url+"/api/order/list")

    if (response.data.success) {
      const paidOrders = response.data.data.filter(order => order.payment && order.status !== "Entregue");
      setOrders(paidOrders);
      console.log(response.data.data);
    }
    else
    {
      toast.error("Erro")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
      fetchAllOrders();
    }, []);

  const clearDeliveredOrders = () => {
    setOrders(orders.filter(order => order.status !== 'Entregue'));
  };


  return (
    <div className='order add'>
      <h3>Pedidos</h3>
      <div className="action-buttons">
        <button onClick={clearDeliveredOrders}>Limpar pedidos entregues</button>
        <button onClick={fetchUnfinishedAllOrders}>Mostrar somente pedidos ainda não entregues</button>
        <button onClick={fetchAllOrders}>Mostrar todos pedidos</button>
      </div>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index ===order.items.length-1) {
                    return item.name + " x " + item.quantity
                  }
                  else
                  {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street+", "}</p>
                <p>{order.address.city + ", " +order.address.state + ", " + order.address.zipcode+ "."}</p>
              </div>
              <p className='order-item-phone'> {order.address.phone}</p>
            </div>
            <p>Itens: {order.items.length}</p>
            <p>R${order.amount.toString().substring(0, 6)}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Em preparo">Em Preparo</option>
              <option value="A caminho">A caminho</option>
              <option value="Entregue">Entregue</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders