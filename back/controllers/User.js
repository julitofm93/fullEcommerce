import User from "../models/User.js";
import { userService } from "../services/services.js"

export const updateUser = async(req,res)=>{
  let {pid} = req.params;
  let content = req.body;
  let user = await userService.getBy({_id:pid})
  if(!user) res.status(404).send({status:"error",error:"Not found"})
  await userService.update(pid,content)
  res.send({status:"success",message:"User updated"})
}

export const deleteUser = async (req,res,next)=>{
  try {
    await userService.delete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await userService.getBy({id : req.params.id});
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}