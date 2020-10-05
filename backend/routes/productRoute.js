import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

// READ ALL - get list of products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// READ ONE - get item for ProductPage
router.get("/:id", async (req, res) => {
  const product = await Product.findOne({_id: req.params.id});
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Item Not Found.'})
  }
});

// CREATE - add new item
router.post("/", isAuth, isAdmin, async (req, res) => {
  const product = new Product({
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
    res.status(201).send({ message: "New Item Added", data: newProduct });
  }
  return res.status(500).send({ message: "Error Adding Product" })
})

// UPDATE - change item info
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.category = req.body.category;
    product.inventory = req.body.inventory;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      res.status(200).send({ message: "Item Updated", data: updatedProduct });
    }
  } else {
    return res.status(500).send({ message: "Error Updating Product" })
  }
});

// DELETE - Remove Item
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if(deletedProduct) {
    await deletedProduct.remove();
    res.send({message: "Item Deleted"});
  } else {
    res.send("Error Deleting Item");
  }
});

export default router;
