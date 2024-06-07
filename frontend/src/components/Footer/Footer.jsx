import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <hr/>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='logo' src={assets.logo} alt="Logo"/>

                <div className="footer-social-icons">
                    <Link to='https://www.instagram.com/_citystop/'> <img src= {assets.instagram} alt=""/></Link>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>City stop</h2>
                <ul>
                    <li>início</li>
                    <li>Termos e Condições</li>
                    <li>delivery</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Endereço</h2>
                <p>Alzira couto machado 597,
                    City Ribeirão, 
                    Ribeirão Preto, 
                    14021130
                </p>
                <h2>Contato</h2>
                <p>+55 016 99777-4321</p>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2024 @ City Stop - All Rights Reserved</p>
    </div>
  )
}

export default Footer