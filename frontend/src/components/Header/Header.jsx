import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div>
        <div className="header">
            <div className="header-contents">
            <h2>Sua parada é aqui!</h2>

            <div className="horarios">
              <p>horários de funcionamento:</p>
              <p>Segunda e terça: 10h às 20h</p>
              <p>quarta a sábado: 10h às 22h </p>
              <p>Domingo: 9h às 15h</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Header