import React from 'react'
import './Explore.css'
import { menu_list } from '../../assets/assets'

const Explore = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore nossos produtos</h1>
        <p className="explore-menu-text">Diversos variedade de produtos disponíveis! escolha uma categoria ou veja todos os produtos de uma vez, faca sua escolha, e em seguida clique no carrinho para Finalizar seu pedido. Os mesmos produtos estão disponíveis na loja se preferir buscar.</p>
        <div className="explore-menu-list">
            {menu_list.map((item, index) => {
                return(
                    <div onClick={() => setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default Explore