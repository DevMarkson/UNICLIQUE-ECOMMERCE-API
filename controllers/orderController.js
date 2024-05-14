const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');

const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const { checkPreferences } = require('joi');


const StripeAPI = async ({ amount, currency }) =>{
    // const client_secret = 'randomValue';
    return {client_secret, amount};
};

const createOrder = async (req, res) =>{
    const { items: cartItems, charges, ShippingFee} = req.body

    if (!cartItems || cartItems.length < 1){
        throw new CustomError.BadRequestError('No cart items provided');
    }

    if (!charges || !ShippingFee){
        throw new CustomError.BadRequestError(
            'Please provide charges and shipping fee'
        );
    }

    let orderItems = [];
    let subtotal = 0;

    for (const item of cartItems){
        const dbProduct = await Product.findOne({ _id: item.product});
        if (!dbProduct){
            throw new CustomError.NotFoundError(
                `No product with id : ${item.product}`
            );
        }
        const {name, price, image, _id} = dbProduct
        const SingleOrderItem = {
            amount: item.amount,
            name,
            price,
            image,
            product: _id,
        };

        // add items to order
        orderItems = [...orderItems, SingleOrderItem];
        // calculate subtotal
        subtotal += item.amount * price;
    }
    // calculate total
    const total = charges + ShippingFee + subtotal;

    const order = await Order.create({
        orderItems,
        total,
        subtotal,
        charges,
        ShippingFee
    });

    res.status(StatusCodes.CREATED).json({ order})
}

const getAllOrders = async (req, res) => {
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json({ orders, count: orders.length});
}

const getSingleOrder = async (req, res) => {
    const { id: orderId } = req.params;
    const order = await Order.findOne({ _id: orderId});
    
    if (!order){
        throw new CustomError.NotFoundError(`No order with id: ${orderId}`);
    }

    checkPermissions(req.user, order.user);
    res.status(StatusCodes.OK).json({ order});
}

const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.userId});
    res.status(StatusCodes.OK).json({ orders, count: orders.length});
}

const updateOrder = async (req, res) => {
    const {id: orderId} = req.params;
    const { paymentIntentId } = req.body;


    const order = await Order.findOne({ _id: orderId});
    if (!order){
        throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
    }
    checkPermissions(req.user, order.user);

    order.paymentIntentId = paymentIntentId;
    order.status = 'paid';
    await order.save();

    res.status(StatusCodes.OK).json({ order });
};

module.exports = {
    createOrder,
    updateOrder,
    getSingleOrder,
    getAllOrders,
    getCurrentUserOrders,
};