# 🛒 Product Service

A lightweight and scalable **Product microservice** built with **Node.js**, **Express**, and **MongoDB**, responsible for product management in a microservices architecture.

This service is part of a larger distributed system and is designed to manage product data, including creation, reading, updating, and deletion (CRUD).

---

## 📌 Responsibilities

- Add new products
- Retrieve all products or single product
- Update product details
- Delete products
- JWT-based protected routes

---

## 🗂️ Service Structure

```
product-service/
├── src/
│   ├── index.js                  # Application entry point
│   │
│   ├── routes/
│   │   └── product.js            # Product API routes
│   │
│   ├── models/
│   │   └── product.js            # Product schema & model
│   │
│   └── middleware/
│       └── auth.middleware.js    # JWT authentication middleware
│
├── node_modules/                 # Dependencies
├── .env                          # Environment variables
├── Dockerfile                    # Container configuration
├── package.json
├── package-lock.json
└── README.md
```

---

## 🌐 API Endpoints

### ➤ Create Product

```
POST /api/products
```

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body**

```json
{
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 2000,
  "stock": 10
}
```

**Response**

```json
{
  "_id": "PRODUCT_ID",
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 2000,
  "stock": 10,
  "createdAt": "2025-12-26T08:15:09.829Z",
  "updatedAt": "2025-12-26T08:15:09.829Z",
  "__v": 0
}
```

---

### ➤ Get All Products

```
GET /api/products
```

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response**

```json
[
  {
    "_id": "PRODUCT_ID",
    "name": "Laptop",
    "description": "Gaming laptop",
    "price": 2000,
    "stock": 10,
    "createdAt": "2025-12-26T08:15:09.829Z",
    "updatedAt": "2025-12-26T08:15:09.829Z",
    "__v": 0
  }
]
```

---

### ➤ Update Product

```
PUT /api/products/:id
```

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body Example**

```json
{
  "name": "Laptop Pro",
  "price": 2200,
  "stock": 8
}
```

**Response**

```json
{
  "_id": "PRODUCT_ID",
  "name": "Laptop Pro",
  "description": "Gaming laptop",
  "price": 2200,
  "stock": 8,
  "createdAt": "2025-12-26T08:15:09.829Z",
  "updatedAt": "2025-12-26T08:15:10.356Z",
  "__v": 0
}
```

---

### ➤ Delete Product

```
DELETE /api/products/:id
```

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response**

```json
{
  "message": "Product deleted successfully"
}
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the service:

```
PORT=5001
MONGO_URI=mongodb://localhost:27017/productdb
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Running the Service (Local)

```bash
npm install
npm run dev
```

The service will be available at:

```
http://localhost:5001
```

---

## 🧪 Testing

The service can be tested using:

- Postman
- PowerShell (`Invoke-RestMethod`)
- Any HTTP client

All CRUD operations and authentication flows can be validated.

---

## 🧱 Architecture Notes

- Each microservice owns its own database
- Stateless authentication using JWT
- Designed for containerization (Docker) and orchestration
- Consistent structure with other microservices

---

## 🐳 Docker Support

A Dockerfile is provided to containerize the service and run it in isolated environments. Example:

```bash
docker build -t product-service .
docker run -p 5001:5001 product-service
```

---

## 📎 Part of a Microservices System

This service is part of a **Large-Scale Microservices Project**, including:

- User Service
- Product Service
- Order Service
- Payment Service
- Notification Service
