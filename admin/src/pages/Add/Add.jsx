import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Cervejas"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)

        const response = await axios.post(`${url}/api/food/add`, formData);

        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Cervejas"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else
        {
            toast.error(reponse.data.message)
        }
    }


  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Insira uma Imagem</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload} alt="" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])}type="file" id='image' hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Nome do produto</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Insira aqui' required/>
            </div>
            <div className="add-product-description flex-col">
                <p>descrição do produto</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Insira a descrição aqui' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>categoria do produto</p>
                    <select onChange={onChangeHandler} value={data.category} name="category" >
                        <option value="Cervejas">cervejas</option>
                        <option value="Destilados">destilados</option>
                        <option value="Bebidas não-alcoólicas">bebidas não-alcoólicas</option>
                        <option value="Queijos">queijos</option>
                        <option value="Carnes">artigos para churrasco</option>
                        <option value="Massas">massas</option>
                        <option value="Mercearia/conveniência">Mercearia/conveniência</option>

                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>preço do produto</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='R$10' required/>
                </div>
            </div>
            <button type='submit' className='add-btn'>Adicionar produto</button>
        </form>

    </div>
  )
}

export default Add