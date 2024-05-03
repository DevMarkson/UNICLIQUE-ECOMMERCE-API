const dotenv = require("dotenv");
// load config
dotenv.config({
  path: "./config/config.env",
});

const connectDB = require("./db/connect");
const Product = require("./models/ProductModel");

const jsonProducts = require("./mockData/products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Sucesss!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

start();
