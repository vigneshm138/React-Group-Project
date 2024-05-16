const express=require('express')
const users=require('./Routers/users')
const houses=require('./Routers/houses')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()

app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/real-estate')

mongoose.connection.on("connected",()=>{
    console.log("mongo connectd");
})

app.get('/',(req,res)=>{
    res.send("server")
})

app.use('/users',users)
app.use('/houses',houses)

app.listen(3009,()=>{
    console.log("server is running");
})