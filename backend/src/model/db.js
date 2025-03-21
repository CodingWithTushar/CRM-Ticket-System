import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model

const UserSchema = new Schema({
    fullName: {type:String , required:true},
    email: {type:String , required:true , unique: true},
    password: {type:String , required:true , minlength:6},
} , {timestamps:true})

const TicketSchema = new Schema({
    fullName: {type:String , required:true},
    email: {type:String , required:true , unique: true},
    password: {type:String , required:true , minlength:6},
} , {timestamps:true})

export const UserModel = model("User" , UserSchema)

