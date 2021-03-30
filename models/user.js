const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
name:String,
mail:String,
phoneNumber:Number,
age:Number
})

module.exports=mongoose.model('users',userSchema)