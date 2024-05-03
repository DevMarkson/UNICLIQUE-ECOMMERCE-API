const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./db/connect");
const productsRouter = require('./routers/productRoute')
const fileUpload = require('express-fileupload');
require('express-async-errors');
const app = express();

// load config
dotenv.config({
  path: "./config/config.env",
});

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// routes
app.get("/", (req, res) => {
  res.send('<h1>Product API</h1><a href="/api/products">products route</a>');
});

app.use('/api/v1/products', productsRouter)

// products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
