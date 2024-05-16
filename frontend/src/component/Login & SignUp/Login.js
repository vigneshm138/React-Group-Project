import React, { useEffect, useState } from 'react'
import './Login.css'
import { Authuse, UserAuth } from '../UserAuth'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    // userDetails --- loginDatabasse.json ----http://localhost:2001/users
    const useauth=Authuse()
    const URLlink=useauth.userLoginUrl
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setuser] = useState([])
    const [wrong, setwrong] = useState('')
    const navigate = useNavigate()
    const authe = Authuse()

    useEffect(() => {
        axios.get("http://localhost:3009/users/get").then(res => setuser(res.data)).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setTimeout(() => {
            setwrong('')
        }, 1000);


        console.log(email);
        const fineUser = user.find(x => x.email === email)
        console.log(fineUser);

        if (fineUser) {
            if (fineUser.name === "admin") {
                console.log(fineUser.password);
                if (fineUser.password === password) {
                    authe.login(fineUser.name,fineUser._id)
                    navigate('/admin')
                } else {
                    setwrong("incorrect password")
                }
            } else {
                if (fineUser.password === password) {
                    authe.login(fineUser.name,fineUser._id)
                    navigate('/')
                } else {
                    setwrong("incorrect password")
                }
            }
        } else {
            setwrong("incorrect email id")
            console.log(fineUser);
        }
    }
    // const auth = Authuse()
    return (
        <div className='login'>
            <h1>login </h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Email id</label>
                    <input type="email" placeholder='Enter Your mail id' required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder='Enter Your Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit'>Submit</button>
                <p className='wrong'>{wrong}</p>
            </form>
            <h2 className='h2'> Don't have an account<NavLink to={'/signUp'}>Sign Up</NavLink></h2>
        </div>
    )
}

export default Login