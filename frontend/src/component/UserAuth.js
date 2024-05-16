import React, { useContext, useState } from 'react'
const auth = React.createContext()
export const UserAuth = (props) => {
    const [userName, setUserName] = useState("")
    const [submitRender,setsubmitRender]=useState(true)
    const [userLoginUrl,setuserLoginUrl]=useState('http://localhost:2002/users')
    const [productsUrl,setproductsUrl]=useState('http://localhost:2001/user')
    const [userId,setuserId]=useState('')

    const login = (name,id) => {
        setUserName(name)
        setuserId(id)
    }
    const logout = () => {
        setUserName('')
    }
    return (
        <div>
            <auth.Provider value={{userLoginUrl,productsUrl,userName, login,logout ,submitRender,setsubmitRender,userId,setuserId}}>
                {props.children}
            </auth.Provider>
        </div>
    )
}

export function Authuse() {
    return useContext(auth)
}
