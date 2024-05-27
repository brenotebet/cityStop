import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add} alt="" />
                <p>Adicionar produtos</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.clipboard} alt="" />
                <p>Ver produtos</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.clipboard} alt="" />
                <p>pedidos</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar