import Cart from "../models/Cart.js"
import User from "../models/User.js"
import {verifyToken, verifyUser, verifyAdmin} from "../utils/verifytoken.js"

//UPDATE
export const updateCart = async (req,res)=>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body
        },
        { new:true }
        );
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json(error)
    }
};

export const deleteCart = async (req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

//GET USER CART
export const getUserCart = async (req,res)=>{
    try {
        const cart = await Cart.findOne({userId: req.params.userId})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
}

//GET ALL 

export const getAllCarts = async (req,res)=>{
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
}
