# UNICLIQUE E-COMMERCE API

This is an E-commerce API built with Node.js, Express, and MongoDB. It provides endpoints for user authentication, product management, and order processing.

## Features

- User registration and login with JWT authentication
- Email verification for new users
- Product management (CRUD operations)
- Order management (CRUD operations)
- Secure file uploads with Cloudinary
- Rate limiting, security headers, and input sanitization

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/DevMarkson/UNICLIQUE-ECOMMERCE-API.git
    cd UNICLIQUE-ECOMMERCE-API
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret
    SMTP_HOST=your_smtp_host
    SMTP_PORT=your_smtp_port
    SMTP_USER=your_smtp_user
    SMTP_PASS=your_smtp_pass
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    FRONTEND_URL=your_frontend_url
    ```

4. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### Auth Routes

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login a user
- `GET /api/v1/auth/logout` - Logout a user

### Product Routes

- `GET /api/v1/products` - Get all products
- `POST /api/v1/products` - Create a new product
- `GET /api/v1/products/:id` - Get a single product
- `PATCH /api/v1/products/:id` - Update a product
- `DELETE /api/v1/products/:id` - Delete a product

### Order Routes

- `GET /api/v1/orders` - Get all orders
- `POST /api/v1/orders` - Create a new order
- `GET /api/v1/orders/:id` - Get a single order
- `PATCH /api/v1/orders/:id` - Update an order
- `DELETE /api/v1/orders/:id` - Delete an order

## Prerequisites

- Node.js
- MongoDB

## Authors

- [DevMarkson](https://github.com/DevMarkson)
