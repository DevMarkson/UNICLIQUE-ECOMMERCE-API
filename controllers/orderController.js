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
        // calculate suntotal
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
