import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

    const {url, setToken} = useContext(StoreContext)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()

        let newUrl = url;

        if (currState==="Login") {
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
        }

        else{
            alert(response.data.message)
        }
    }

    const [currState, setCurrState] = useState("Login")

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value= {data.name} type="text" placeholder='Nome Completo' required />}
                <input name='email' onChange={onChangeHandler} value= {data.email} type="email" placeholder='Email' required />
                <input name='password' onChange={onChangeHandler} value= {data.password} type="password" placeholder='Senha' required />
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>Eu aceito os termos e condições de uso.</p>
            </div>
            {currState==="Login"?<p>não tem conta? <span onClick={() => setCurrState("Sign Up")}>Clique aqui!</span></p>
            :<p>JÁ possui uma conta? <span onClick={() => setCurrState("Login")}>Entre na sua conta aqui!</span></p>
            }
            
        </form>
    </div>
  )
}

export default LoginPopup