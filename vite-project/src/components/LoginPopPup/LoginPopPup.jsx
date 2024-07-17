import React, { useContext, useEffect, useState } from 'react'
import './LoginPopPup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const LoginPopPup = ({setShowLogin}) => {
  const [currState , setCurrState] = useState("Login")
  const {url ,setToken} = useContext(StoreContext)
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    // useEffect(()=>{
    //   console.log(data)
    // },[data])
    const onChangeHandler = (event) =>{
      const name = event.target.name
      const value = event.target.value
      setData(data => ({...data,[name]:value}))
    }
   




    const onLogin = async (event) => {
        event.preventDefault();
        try {
            const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
            const newUrl = `${url}${endpoint}`;
            console.log(newUrl)
            const response = await axios.post(newUrl, data);
            console.log(data)

            if (response.data.success) {
                setToken(response.data.token);
                console.log(response.data.token)
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error during login/register:", error);
            alert("An error occurred. Please try again.");
        }
    };
    
  return (
    <div  className='login-popup'>
      <form onSubmit={onLogin} className="login-poppup-container">

        <div className="login-poppup-title">
            <h2>{currState}</h2>
            <img  onClick={()=>setShowLogin(false)}   src={assets.cross_icon}  />
        </div>

        <div className="login-poppup-inputs">
            {currState==="Login" ? <></> :<input  name='name' onChange={onChangeHandler} value={data.name} type="text"  placeholder='your name' required/> }
            <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='your email' required />
            <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='password' required />
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>

        <div className="login-poppup-condition">
            <input type="checkbox" required />
            <p>By Continuing , i agree to the terms of use & privacy policy</p>
        </div>
        {
            currState === "Login" 
            ? <p>Create new account    <span onClick={()=> setCurrState ("Sign Up") }>Click here </span></p>
            :  <p>Already have an account  <span onClick={()=> setCurrState ("Login") }>Login here</span>  </p>
        }
      </form>
    </div>
  )
}

export default LoginPopPup
