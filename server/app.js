import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productRouter from "./apps/products.js";

const app = express();
const port = 4001;

app.use(cors());
app.use(bodyParser.json());

app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
