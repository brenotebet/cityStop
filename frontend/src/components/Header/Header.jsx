import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div>
        <div className="header">
            <h2>Sua parada é aqui!</h2>
            <div className="header-contents">
            <div className="intro">
            <p>Bem-vindo a City Stop! Aqui você encontra uma seleção especial de cervejas,
              destilados, carnes congeladas, queijos, bebidas não-alcoólicas, massas e mercearia/conveniencia. Venha nos visitar! Na City Stop, a qualidade e a satisfação dos nossos clientes são nossas prioridades.</p>
            </div>
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