const express = require("express");
const app = express();
const cors = require('cors');

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());

// JSON categorías
app.get("/cats", (req, res) => {
  res.json(require("./jsons/cats/cat.json"));
});

// JSON productos de categorías
app.get("/cats_products/:id", (req, res) => {
  res.json(require("./jsons/cats_products/" + req.params.id + ".json"));
});

// JSON productos
app.get("/products/:id", (req, res) => {
  res.json(require("./jsons/products/" + req.params.id + ".json"));
});

// JSON comentarios de producto
app.get("/products_comments/:id", (req, res) => {
  res.json(require("./jsons/products_comments/" + req.params.id + ".json"));
});

// Mensaje de vendido
app.get("/sell", (req, res) => {
  res.json(require("./jsons/sell/publish.json"));
});

// Carrito del usuario
app.get("/user_cart", (req, res) => {
  res.json(require("./jsons/user_cart/25801.json"));
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
