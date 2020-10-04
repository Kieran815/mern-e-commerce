import express from 'express';
import Product from '../models/productModel';
import { getToken } from '../util';

const router = express.Router();

// READ ALL - get list of products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// CREATE - add new item
router.post("/", async (req, res) => {
  const product = new Product ({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    inventory: req.body.inventory,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews
  })
  const newProduct = await product.save();
  if (newProduct) {
    res.status(201).send({ msg: "New Item Added", data: newProduct });
  }
  return res.status(500).send({ msg: "Error Adding Product" })
})

export default router;
