import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({setShowLogin}) => {

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext)
  const [menu, setMenu] = useState("home");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="Logo" className='logo'/></Link>
        <ul className='navbar-menu'>
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>início</Link>
            <a href='/#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>produtos</a>
            <a href='#footer' onClick={()=>setMenu("contact")} className={menu==="contact"?"active":""}>Contato</a>
        </ul>
        <div className='navbar-right'>
            <div className="navbar-search-icon">
                <Link to='/cart'> <img src={assets.cart} alt="Cart" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>  
        </div>
    </div>
  )
}

export default Navbar