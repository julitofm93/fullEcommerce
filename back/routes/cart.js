import express from "express";
import {
  createCart,
  deleteCart,
  getUserCart,
  getAllCarts,
  updateCart,
} from "../controllers/Cart.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:userid", createCart);
//UPDATE
router.put("/:id", updateCart);
//DELETE
router.delete("/:id/:userid", deleteCart);
//GET
router.get("/:id", getUserCart);
//GET ALL
router.get("/", getAllCarts);

export default router;
