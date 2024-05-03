const dotenv = require("dotenv");
// load config
dotenv.config({
    path: "./config/config.env",
  });
  

const connectDB = require('./db/connect')
const Product = require('./models/ProductModel')

const jsonProducts = require('./mockData/products.json')

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log('Sucesss!!')
    }
    catch (error) {
        console.log(error)
    }
}

start()