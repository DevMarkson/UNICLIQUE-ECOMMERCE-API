const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet  = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// USE V2
const cloudinary = require('cloudinary').v2;

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require('./routes/auth')
const productsRouter = require('./routers/productRoute')
const ordersRouter = require('./routers/orderRoute')

require('express-async-errors');
const app = express();

// load config
dotenv.config({
  path: "./config/config.env",
});

// load cloudinary
cloudinary.config({
    path: "./config/config.env",
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.set('trust proxy', 1);
app.use (
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

// middleware
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// routes
app.get("/", (req, res) => {
  res.send('<h1>Product API</h1><a href="/api/products">products route</a>');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/orders', ordersRouter);

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
