# 📦 Orders Service

> A **modular, scalable, and event-driven Orders microservice** built with Node.js and RabbitMQ.

---

## 🗂️ Service Structure

```
orders-service/
├── src/
│   ├── config/
│   │   ├── index.js
│   │   ├── database.js
│   │   └── rabbitmq.js
│   │
│   ├── modules/
│   │   └── order/
│   │       ├── order.controller.js
│   │       ├── order.service.js
│   │       ├── order.repository.js
│   │       ├── order.model.js
│   │       └── order.routes.js
│   │
│   ├── messaging/
│   │   ├── rabbitmq.connection.js
│   │   ├── order.publisher.js
│   │   ├── order.consumer.js
│   │   └── queues.js
│   │
│   ├── domain/
│   │   └── order.constants.js
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
| `index.js`    | Loads and aggregates all configs |
| `database.js` | Database connection settings |
| `rabbitmq.js` | RabbitMQ connection options |

---

## 🧩 Order Module (`src/modules/order/`)

A **self-contained feature module** implementing the Order domain.

| Layer         | File                  |
|---------------|-----------------------|
| Controller    | `order.controller.js` |
| Business Logic| `order.service.js`    |
| Data Access   | `order.repository.js` |
| Model         | `order.model.js`      |
| Routes        | `order.routes.js`     |

✅ Keeps order-related logic **isolated and testable**  
✅ Easy to extend without affecting other modules

---

## 📨 Messaging Layer (`src/messaging/`)

Handles **event-driven communication** using RabbitMQ.

| File                    | Description                     |
|-------------------------|---------------------------------|
| `rabbitmq.connection.js`| Manages connection lifecycle   |
| `order.publisher.js`    | Publishes order events          |
| `order.consumer.js`     | Consumes order events           |
| `queues.js`             | Centralized queue & exchange definitions |

This allows the service to remain **loosely coupled** from other services.

---

## 📚 Domain Layer (`src/domain/`)

Contains **pure domain knowledge** with no infrastructure dependencies.

- `order.constants.js`
  - Order statuses
  - Event names
  - Domain-level rules

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
| `.env`         | Environment variables    |
| `Dockerfile`   | Container configuration  |
| `package.json` | Dependencies & scripts   |

---