const Product = require("../models/ProductModel");
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const getAllProducts = async (req, res) => {
    // console.log(req.query)
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({products, count: products.length});
};

const getSingleProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId }).populate('reviews');
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id: ${productId}`);
    }
    res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
    const {id: productId} = req.params;
    const product = await Product.findOneAndUpdate({ _id: productId}, req.body, {
        new: true,
        runValidators: true,
    });
    
    if (!product){
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }

    res.status(StatusCodes.OK).json({ product});
}


module.exports = {
  getAllProducts,
  getSingleProduct
};
