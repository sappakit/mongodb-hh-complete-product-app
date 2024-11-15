import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

// Get all products
productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");

    const products = await collection.find({}).toArray();

    return res.status(200).json({
      data: products,
    });
  } catch {
    return res.status(500).json({
      message: "An error occurred while getting the products data",
    });
  }
});

// Get product by id
productRouter.get("/:id", async (req, res) => {
  try {
    const productIdFromClient = new ObjectId(req.params.id);
    const collection = db.collection("products");

    const product = await collection.findOne({ _id: productIdFromClient });

    return res.status(200).json({
      data: product,
    });
  } catch {
    return res.status(500).json({
      message: "An error occurred while getting the product data",
    });
  }
});

// Post new product
productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("products");

    const productData = { ...req.body };
    await collection.insertOne(productData);

    return res.status(201).json({
      message: "Product has been created successfully",
    });
  } catch {
    return res.status(500).json({
      message: "An error occurred while creating the product",
    });
  }
});

// Update product
productRouter.put("/:id", async (req, res) => {
  try {
    const productIdFromClient = new ObjectId(req.params.id);
    const collection = db.collection("products");

    const newProductData = { ...req.body };

    await collection.updateOne(
      { _id: productIdFromClient },
      { $set: newProductData }
    );

    return res.status(200).json({
      message: "Product has been updated successfully",
    });
  } catch {
    return res.status(500).json({
      message: "An error occurred while updating the product",
    });
  }
});

// Delete product
productRouter.delete("/:id", async (req, res) => {
  try {
    const productIdFromClient = new ObjectId(req.params.id);
    const collection = db.collection("products");

    await collection.deleteOne({ _id: productIdFromClient });

    return res.status(200).json({
      message: "Product has been deleted successfully",
    });
  } catch {
    return res.status(500).json({
      message: "An error occurred while deleting the product",
    });
  }
});

export default productRouter;
