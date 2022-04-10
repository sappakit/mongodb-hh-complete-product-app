import { Router } from "express";

const productRouter = Router();

let products = [
  {
    id: 1,
    name: "Fond - Neutral",
    price: 160,
    image: "http://dummyimage.com/350x350.png/dddddd/000000",
    description: "Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  },
  {
    id: 2,
    name: "Pepper - Cubanelle",
    price: 7624,
    image: "http://dummyimage.com/350x350.png/cc0000/ffffff",
    description: "Nulla facilisi.",
  },
];

productRouter.get("/", (req, res) => {
  res.json({
    data: products,
  });
});

productRouter.get("/:id", (req, res) => {
  const productId = +req.params.id;
  const hasFound = products.find((post) => post.id === productId);

  if (!hasFound) {
    return res.status(404).json({
      message: `Product ${productId} not found`,
    });
  }

  const product = products.filter((product) => product.id === productId);

  return res.json({
    data: product[0],
  });
});

productRouter.post("/", (req, res) => {
  products.push({
    id: products[products.length - 1].id + 1,
    ...req.body,
  });

  return res.json({
    message: "Product has been created.",
  });
});

productRouter.put("/:id", (req, res) => {
  const updatedProduct = req.body;
  const productId = +req.params.id;

  const hasFound = products.find((product) => product.id === productId);

  if (!hasFound) {
    return res.status(404).json({
      message: `Product ${productId} not found`,
    });
  }

  const productIndex = products.findIndex((post) => {
    return post.id === +productId;
  });

  products[productIndex] = {
    id: productId,
    ...updatedProduct,
  };

  return res.json({
    message: `Product ${productId} has been updated.`,
  });
});

productRouter.delete("/:id", (req, res) => {
  const productId = +req.params.id;

  const hasFound = products.find((product) => product.id === productId);

  if (!hasFound) {
    return res.status(404).json({
      message: `Product ${productId} not found`,
    });
  }

  products = products.filter((product) => {
    return productId !== product.id;
  });

  return res.json({
    message: `Product ${productId} has been deleted.`,
  });
});

export default productRouter;
