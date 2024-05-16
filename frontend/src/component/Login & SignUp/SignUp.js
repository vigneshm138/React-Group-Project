import axios from "axios";
import React, { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { Authuse } from "../UserAuth";

const SignUp = () => {

    const useauth=Authuse()
    const URLlink=useauth.userLoginUrl
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3009/users/post", { name:name, email:email, password:password }).then(res => console.log(res)).catch(err => console.log(err))
        navigate('/login')
    }
    return (
        <div className="login">
              <h1>Sign up </h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input type="text" placeholder="Enter Your Name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email id</label>
                    <input type="email" placeholder="Enter Your mail id" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Enter Your Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
            <h2 className='h2'> already have an account<NavLink to={'/login'}>login</NavLink></h2>
        </div>
    );
};

export default SignUp;