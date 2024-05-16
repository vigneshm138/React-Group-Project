import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Authuse } from '../UserAuth'
import './Profile.css'

const Profile = () => {
    const navigatee = useNavigate()
    const user = Authuse()


    return (
        <div  style={{textAlign:"center",marginTop:"60px"}} className='profile'>
            {user.userName ? <div>
                <h1>welcome {user.userName} </h1>
                <button onClick={user.logout}>Logout</button>
            </div> : <div>

                <h1 style={{ textTransform: "uppercase" }}>login to view the content</h1>
                <button onClick={() => navigatee('/login')} >LOGIN</button>
            </div>}
        </div>
    )
}
export default Profile
