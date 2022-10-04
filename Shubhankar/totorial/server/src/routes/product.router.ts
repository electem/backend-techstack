import express from "express";
import { ProductRepository } from "src/repositories/product.repository";
import {ProductController} from '../controllers/product.controller';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ProductController();
  const response = await controller.getProducts();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new ProductController();
  const response = await controller.createProduct(req.body);
  return res.send(response);
});


//Working code
// router.get("/:id", async (req, res) => {
//   const controller = new ProductController();
//   const response = await controller.getProduct(req.params.id);
//   if (!response) res.status(404).send({message: "No comment found"})
//   return res.send(response);
// });


//Query Code
router.get("/:id", async (req, res) => {
  const controller = new ProductController();
  const response = await controller.getProdProfile(req.params.id);
  if (!response) res.status(404).send({message: "No product found"})
  return res.send(response);
});

export default router;