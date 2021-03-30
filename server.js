const express=require('express')
require('dotenv').config()
const mongoose=require('mongoose')
const user=require('./models/user')


mongoose.connect(process.env.URL,{useNewUrlParser: true,useUnifiedTopology: true,})
.then(()=>{
    console.log('Connected to Database')
    const app=express()
    app.use(express.json())
    
    //a get route to return all users in the database
    app.get('/allUsers',(req,res)=>{
    user.find()
    .then(result=>res.send(result))
    .catch(err=>console.log('error while searching for data',err))
    })
    //a post route to create users in the database
    app.post('/newUser',(req,res)=>{
    const newUser = req.body;
    user.create(newUser)
    .then(result=>res.send(result))
    .catch(err=>console.log('error while adding a new user',err))
    })
    //a put route to update a user using ID
    app.put('/updateUser/:id',(req,res)=>{
    const userId=req.params.id;
    const newUpdate=req.body;
    user.findByIdAndUpdate({_id:userId},newUpdate,{new:true})
    .then(result=>res.send(result))
    .catch(err=>console.log('error while updating the user',err))
})
    
    //a delete route to delete a user by ID
    app.delete('/deleteUser/:id',(req,res)=>{
    const userId=req.params.id;
    user.findByIdAndRemove({_id:userId})
    .then(userDeleted=>res.send(userDeleted))
    .catch(err=>console.log('error while deleting user',err))
    })


    app.listen(process.env.PORT,(error)=>
    error
    ?console.log('error while conecting to the server',error)
    :console.log('server is running')
    )
})
.catch((err)=>console.log('error wile conneting to Database',err))

