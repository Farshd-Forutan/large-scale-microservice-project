# 📦 Payment Service

> A **modular, scalable, and event-driven Payments microservice** built with Node.js and RabbitMQ.

---

## 🗂️ Service Structure

```
payment-service/
├── src/
│   ├── config/
│   │   ├── index.js
│   │   ├── database.js
│   │   └── rabbitmq.js
│   │
│   ├── modules/
│   │   └── payment/
│   │       ├── payment.controller.js
│   │       ├── payment.service.js
│   │       ├── payment.repository.js
│   │       ├── payment.model.js
│   │       └── payment.routes.js
│   │
│   ├── middlewares/
│   │    └── auth.middleware.js
│   │
│   ├── messaging/
│   │   ├── rabbitmq.connection.js
│   │   ├── payment.publisher.js
│   │   └── queues.js
│   │
│   ├── domain/
│   │   └── payment.constants.js
│   │
│   ├── utils/
│   │   └── apiError.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── Dockerfile
├── package.json
└── README.md
```

---

## 🔧 Configuration Layer (`src/config/`)

Centralized configuration for external services and environment setup.

| File          | Responsibility              |
|---------------|-----------------------------|
| `index.js`    | Loads and aggregates all configs (Single Source of Truth) |
| `database.js` | Database connection settings |
| `rabbitmq.js` | RabbitMQ connection options |

---

## 🧩 Payment Module (`src/modules/payment/`)

A **self-contained feature module** implementing the Payment domain.

| Layer         | File                    |
|---------------|-------------------------|
| Controller    | `payment.controller.js` |
| Business Logic| `payment.service.js`    |
| Data Access   | `payment.repository.js` |
| Model         | `payment.model.js`      |
| Routes        | `payment.routes.js`     |

✅ Keeps payment-related logic **isolated and testable**  
✅ Easy to extend without affecting other modules

### Payment Logic in `payment.service.js`
This file handles the core business logic for processing payments. It simulates interaction with a bank gateway using a 1.5-second delay, applies a 90% success rate (randomly determining 'SUCCESS' or 'FAILED' status), generates a unique transaction ID, saves the payment record via the repository, and publishes a 'payment completed' event only on success for integration with other services (e.g., order updates). 
The exported `processPayment` function takes order ID and amount as input and returns the created payment record.

---

## 📨 Messaging Layer (`src/messaging/`)

Handles **event-driven communication** using RabbitMQ.

| File                    | Description                     |
|-------------------------|---------------------------------|
| `rabbitmq.connection.js`| Manages connection lifecycle   |
| `payment.publisher.js`  | Publishes payment events        |
| `queues.js`             | Centralized queue & exchange definitions |

This allows the service to remain **loosely coupled** from other services.

---

## 📚 Domain Layer (`src/domain/`)

Contains **pure domain knowledge** with no infrastructure dependencies.

- `payment.constants.js`
  - Payment statuses (PENDING, SUCCESS, FAILED)

---

## 🛠️ Utilities (`src/utils/`)

Reusable helpers shared across the service.

- `apiError.js` – Standardized API error handling

---

## 🚀 Application Entry Points

| File       | Purpose                          |
|------------|----------------------------------|
| `app.js`   | Express app setup (middlewares & routes) |
| `server.js`| Server bootstrap & startup       |

---

## 🐳 Infrastructure

| File           | Description              |
|----------------|--------------------------|
| `Dockerfile`   | Container configuration  |
| `package.json` | Dependencies & scripts   |

---