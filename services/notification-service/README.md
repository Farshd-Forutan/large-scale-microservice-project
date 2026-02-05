# 📩 Notification Service

> A **lightweight, event-driven Notification microservice** built with Node.js and RabbitMQ, responsible for processing system events and sending email notifications asynchronously.

---

## 🧱 Project Structure

High-level overview of the service structure:

```
notification-service/  
├── src/  
│   ├── config/  
│   │   ├── index.js            
│   │   ├── rabbitmq.js          
│   │   └── mailer.js            
│   │  
│   ├── messaging/  
│   │   ├── rabbitmq.connection.js  
│   │   ├── notification.consumer.js  
│   │   └── rabbitmq.constants.js  
│   │  
│   ├── services/  
│   │   ├── email.service.js     
│   │   └── email.templates.js   
│   │  
│   ├── utils/  
│   │   └── logger.js           
│   │  
│   └── server.js                
│  
├── Dockerfile  
└── README.md  
```

---

## 🔧 Configuration Layer (`src/config/`)

Centralized configuration for external services and environment-based settings.

| File           | Responsibility |
|----------------|----------------|
| `index.js`     | Loads and aggregates all service configurations |
| `rabbitmq.js`  | RabbitMQ connection and messaging configuration |
| `mailer.js`    | Email (SMTP) configuration and sender options |

---

## 📨 Messaging Layer (`src/messaging/`)

Handles **event-driven communication** using RabbitMQ.

| File                         | Description |
|------------------------------|-------------|
| `rabbitmq.connection.js`     | Manages RabbitMQ connection and channels |
| `notification.consumer.js`  | Consumes notification-related events |
| `rabbitmq.constants.js`      | Centralized exchange, queue, and routing key definitions |

This design ensures the Notification Service remains **loosely coupled** from other services while reacting to domain events.

---

## ✉️ Notification Services (`src/services/`)

Contains the **business logic for sending notifications**.

| File                 | Responsibility |
|----------------------|----------------|
| `email.service.js`   | Handles email delivery logic |
| `email.templates.js` | Defines reusable email templates for different events |

Templates are selected dynamically based on the consumed event type.

---

## 🛠️ Utilities (`src/utils/`)

Shared helper utilities used across the service.

- **`logger.js`**
  - Lightweight logging utility
  - Supports `INFO`, `WARN`, and `ERROR` levels
  - Includes timestamps and structured output


---

## 🚀 Application Entry Point

| File        | Purpose |
|-------------|---------|
| `server.js` | Service bootstrap and consumer initialization |

> ⚠️ This service does **not expose HTTP endpoints**.  
> All interactions occur asynchronously via RabbitMQ events.

---

## 🐳 Infrastructure

| File         | Description |
|--------------|-------------|
| `Dockerfile` | Container configuration for the Notification Service |

The service is designed to run:
- As part of **Docker Compose**
- Inside a **Kubernetes cluster**
- Or as a standalone container

---

## 📝 Notes

- Fully asynchronous, event-driven architecture
- Stateless and horizontally scalable
- Focused solely on notification delivery
- Easily extensible to support:
  - SMS notifications
  - Push notifications
  - Webhook-based notifications
