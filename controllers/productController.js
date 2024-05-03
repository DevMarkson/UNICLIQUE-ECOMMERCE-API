const Product = require("../models/ProductModel");
const {StatusCodes} = require('http-status-codes');
const CustomAPIError = require('../errors');
const path = require('path');

const getAllProducts = async (req, res) => {
    // console.log(req.query)
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({products, count: products.length});
};

const getSingleProduct = async (req, res) =>{
    
}

}

module.exports = {
  getAllProducts,
};
