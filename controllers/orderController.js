const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');

const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');


const StripeAPI = async ({ amount, currency }) =>{
    const client_secret = 'randomValue';
    return {client_secret, amount};
};

const createOrder = async (req, res) =>{
    const { items: cartItems, charges, ShippingFee} = req.body
}
