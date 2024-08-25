const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const express = require("express");
const https = require("https");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// USE V2
const cloudinary = require("cloudinary").v2;

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routers/authRoute");
const userRouter = require("./routers/userRoute");
const productsRouter = require("./routers/productRoute");
const ordersRouter = require("./routers/orderRoute");

require("express-async-errors");
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

app.set("trust proxy", 1);
app.use(
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
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload({ useTempFiles: true }));

// routes
app.get("/", (req, res) => {
  res.send('<h1>Uniclique E-commerce API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.get("/paystack", (req, res) => {
  const params = JSON.stringify({
    email: "customer@email.com",
    amount: "200000",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: "Bearer SECRET_KEY",
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        res.send(data)
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpaystack.write(params);
  reqpaystack.end();
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/vi/users", userRouter);

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





