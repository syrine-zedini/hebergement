import express from 'express';
import userAuth from '../middleware/userAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';
import Product from "../models/productModel.js";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
const productRoute = express.Router();

productRoute.post('/create-product', userAuth, requireAdmin, createProduct);
productRoute.get('/get-all-products', userAuth, requireAdmin, getAllProducts);
productRoute.get('/get-product/:id', userAuth, requireAdmin, getProductById);
productRoute.put('/update-product/:id', userAuth, requireAdmin, updateProduct);
productRoute.delete('/delete-product/:id', userAuth, requireAdmin, deleteProduct);  



const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;