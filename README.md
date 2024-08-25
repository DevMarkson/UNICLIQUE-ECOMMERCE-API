# Uniclique E-Commerce API

This is an E-commerce API built with Node.js, Express, and MongoDB. It provides endpoints for user authentication, product management, and order processing. It also provides Swagger documentation for easy reference.

## Table of Contents
- [Swagger Documentation](#swagger-documentation)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Products](#products)
  - [Orders](#orders)
- [Swagger YAML](#swagger-yaml)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Database Connection](#database-connection)
- [Middleware](#middleware)
- [Models](#models)
- [Controllers](#controllers)

## Swagger Documentation
You can access the Swagger documentation for this API at `https://uniclique-ecommerce-api.onrender.com/api-docs`. The Swagger UI provides detailed information about the API endpoints, request schemas, and example requests and responses.

## API Endpoints

### Authentication
- **POST /api/v1/auth/register**
  - Register a new user.
  - Example Request Body:
    ```json
    {
      "firstName": "Favour",
      "lastName": "Maparo",
      "email": "marksongee@gmail.com",
      "phoneNumber": "08020405070",
      "password": "Maparo",
      "role": "user"
    }
    ```

- **POST /api/v1/auth/login**
  - Log in an existing user.
  - Example Request Body:
    ```json
    {
      "email": "maparo165@gmail.com",
      "password": "Maparo"
    }
    ```

### Products
- **POST /api/v1/products**
  - Create a new product (requires authentication).
  - Example Request Body:
    ```json
    {
      "name": "Product Name",
      "description": "Product Description",
      "price": 100,
      "imageUrl": "http://example.com/image.jpg"
    }
    ```

- **GET /api/v1/products**
  - Retrieve all products.

- **GET /api/v1/products/{id}**
  - Retrieve a single product by its ID.

- **PATCH /api/v1/products/{id}**
  - Update a product by its ID (requires authentication).
  - Example Request Body:
    ```json
    {
      "name": "Updated Product Name",
      "description": "Updated Product Description",
      "price": 150
    }
    ```

- **DELETE /api/v1/products/{id}**
  - Delete a product by its ID (requires authentication).

### Orders
- **POST /api/v1/orders**
  - Create a new order (requires authentication).
  - Example Request Body:
    ```json
    {
      "products": [
        {
          "productId": "product_id_1",
          "quantity": 2
        },
        {
          "productId": "product_id_2",
          "quantity": 1
        }
      ],
      "paymentStatus": "pending"
    }
    ```

- **GET /api/v1/orders**
  - Retrieve all orders for the authenticated user.

- **GET /api/v1/orders/{id}**
  - Retrieve a single order by its ID.

- **PATCH /api/v1/orders/{id}**
  - Update an order by its ID (requires authentication).
  - Example Request Body:
    ```json
    {
      "paymentStatus": "completed"
    }
    ```

- **DELETE /api/v1/orders/{id}**
  - Delete an order by its ID (requires authentication).

## Authentication
The API uses JSON Web Tokens (JWT) for authentication. When a user registers or logs in, a JWT token is provided in the response. To authenticate for protected routes (products and orders-related endpoints), include this token in the `Authorization` header of your requests with the format: `Bearer <token>`.

## Swagger YAML
The Swagger documentation is defined in the `swagger.yaml` file. It provides detailed information about the API endpoints, request and response schemas, and example data.

## Prerequisites
Before you can use the Uniclique E-commerce API, make sure you have the following installed:
- Node.js
- MongoDB
- Git

## Getting Started
1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/yourusername/uniclique-ecommerce-api.git
    ```
2. Navigate to the project directory:
    ```sh
    cd uniclique-ecommerce-api
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Set up environment variables by creating a `.env` file in the root directory. Use this format:
    ```env
    PORT=3000
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    PAYSTACK_SECRET_KEY=your_paystack_secret_key
    ```
5. Start the server:
    ```sh
    npm start
    ```
    The API should now be running on `http://localhost:3000`.

## Database Connection
The API connects to a MongoDB database using Mongoose. The database connection is managed in the `db/connect.js` file.

## Middleware
The API includes several middleware functions for security and request handling:
- `helmet`: Provides security-related HTTP headers.
- `cors`: Enables Cross-Origin Resource Sharing.
- `xss-clean`: Protects against cross-site scripting (XSS) attacks.
- `express-rate-limit`: Implements rate limiting to prevent abuse of the API.
- `authentication`: Middleware to verify JWT tokens and authenticate users.
- `not-found`: Handles requests for non-existent routes.
- `error-handler`: Centralized error handling and response formatting.

## Models
The API uses several mongoose models:
- **User Model**
  - Stores user information including name, email, and hashed password.
  - Provides methods for creating JWT tokens and comparing passwords.
- **Product Model**
  - Stores product details like name, description, price, and image URL.
- **Order Model**
  - Stores order details including user, products, and payment status.

## Controllers
The API controllers handle request processing:
- **Auth Controller**
  - `register`: Handles user registration.
  - `login`: Handles user login.
- **Product Controller**
  - `getAllProducts`: Retrieves all products.
  - `getProduct`: Retrieves a single product by its ID.
  - `createProduct`: Creates a new product.
  - `updateProduct`: Updates a product by its ID.
  - `deleteProduct`: Deletes a product by its ID.
- **Order Controller**
  - `getAllOrders`: Retrieves all orders for the authenticated user.
  - `getOrder`: Retrieves a single order by its ID.
  - `createOrder`: Creates a new order.
  - `updateOrder`: Updates an order by its ID.
  - `deleteOrder`: Deletes an order by its ID.