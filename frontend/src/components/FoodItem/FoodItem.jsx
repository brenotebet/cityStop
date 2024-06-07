import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id, name, price, description, image}) => {
    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext); 

    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img className='food-item-image' src={url+"/images/"+image} alt="" />
                {!cartItems[id] 
                    ?<img className="add" onClick = {() => addToCart(id)} src={assets.add} alt="" />
                    :<div className="food-item-counter">
                        <img onClick = {() => removeFromCart(id)} src={assets.minus} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick = {() => addToCart(id)} src={assets.add} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                </div>
                <p className="food-item-description">{description}</p>
                <p className="food-item-price">R${price}</p>
            </div>
        </div>
    )
}

export default FoodItem;