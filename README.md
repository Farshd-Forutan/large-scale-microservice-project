# 🚀 Large-Scale Microservice Project

A showcase microservices system designed for large-scale application scenarios. This repository demonstrates realistic service decomposition, inter-service communication, containerized deployments, and modern operational tooling.

> **Note:** This repository is intended for review by academic staff and for learning about enterprise-level microservice architectures 🎓.

---

## 📌 Project Overview

**Goals:**  
- Model how independent microservices can work together (product, user, orders, notifications, etc.).
- Provide real-world examples of REST APIs, service orchestration, JWT authentication, event-driven messaging, and containerized deployment.

**Technologies Used:**  
- **Node.js** (JavaScript): primary backend language for all services.
- **Express**: REST API framework.
- **JWT (JSON Web Tokens)**: stateless authentication for APIs.
- **MongoDB / PostgreSQL**: database per service (example: product, user).
- **RabbitMQ**: asynchronous messaging / event bus 📨.
- **PowerShell**: automation testing (DevOps).
- **Docker**: containerization for services and infrastructure 🐳.
- **Kubernetes**: (optional) orchestration and scaling in production ☸️.

---

## 1️⃣ Project Structure

A high-level view of the directory and service layout:

```
[repo root]
├── api-gateway
│     └── test script
|
├── github
│     └── workflows
|          └── [CI/CD]
├── k8s
|    └── [Kubernetes Files]
|
├── services
│     ├── user-service
│     ├── product-service
│     ├── order-service
|     ├── payment-service
│     └── notification-service
│     
├── docker-compose.yml
└── README.md
```
---

## 2️⃣ Service and Component Descriptions

- **API Gateway:**  
  - Entry point for all clients.
  - Handles routing, authentication (JWT), and basic aggregation.

- **User Service:**  
  - User registration, profile management, and credentials.
  - Handles JWT issuing and verification.
  - Owns its database (MongoDB).

- **Product Service:**  
  - CRUD operations for product/catalog items.
  - JWT-protected endpoints.
  - Owns its database (MongoDB).

- **Order Service:**  
  - Receives, updates, and tracks orders.
  - Processes orders asynchronously via RabbitMQ.
  - Integrates with notification and payment services.
  - Owns its database (PostgreSQL).

- **Payment Service:**  
  - Handles payment functionality 💳.
  - Integrates with notification and order services.
  - Owns its database (PostgreSQL).

- **Notification Service:**  
  - Sends emails, push notifications, or messages based on events (order placed, etc.).
  - Subscribes to events from RabbitMQ.

- **Deployment / DevOps:**  
  - `docker-compose.yml` for easy multi-service startup (all services + infrastructure with one command).
  - Kubernetes manifests for cloud or production scaling.

---

## 3️⃣ Technologies Used by Each Part

- **API Gateway:**  
  - Node.js, Express, JWT, Docker  
  - (Optional: Nginx reverse proxy)

- **Services (Product, User, Order, Notification):**  
  - Node.js & Express for API logic.
  - MongoDB / PostgreSQL for data storage.
  - RabbitMQ for events and the outbox pattern.
  - Docker for containerization.

- **Messaging & Infrastructure:**  
  - RabbitMQ (event-driven, pub/sub, work queues).
  - MongoDB (per-service database), Redis (cache/session).
  - PowerShell for developer scripts and automation.

- **Deployment:**  
  - Docker / Docker Compose — run everything locally with one configuration file.
  - Kubernetes manifests for scalable, cloud-native deployments.
  - CI scripts (optional: GitHub Actions, etc.).

---

## 🚀 Getting Started

1. **Clone the repository:**    
   `git clone https://github.com/Farshd-Forutan/large-scale-microservice-project.git`  

2. **Start with Docker Compose:**    
   `docker-compose up --build`  

**— or use Kubernetes —**  
a. `docker-compose build`  
b. `kubectl apply -f k8s/namespace.yaml`  
c. `kubectl apply -f k8s/ -R`

3. **Access services:**  
- API Gateway:  
  ```
  http://localhost:8000/api/<each-microservice-endpoint>
  ```

**Endpoints:**

| Service  | Endpoints |
|---------|-----------|
| User    | `[POST] /auth/signup` &nbsp;&nbsp; `[POST] /auth/login` |
| Product | `[POST] /products` &nbsp; `[GET] /products` &nbsp; `[GET] /products/<id>` &nbsp; `[PUT] /products/<id>` &nbsp; `[DELETE] /products/<id>` |
| Order   | `[POST] /orders` &nbsp; `[GET] /orders/my-orders` &nbsp; `[GET] /orders/<id>` |
| Payment | `[POST] /payments` |

4. **Configure environment variables:**  
- Add a `.env` file for all services in the root of the project ⚙️.

---

## 📝 Notes

- Each microservice is independently scalable and owns its own database.
- Inter-service communication is mostly asynchronous via RabbitMQ.
- Designed for stateless authentication and easy scaling/deployment.
- Easily extensible to include more services (analytics, reporting, etc.).
- For detailed API references, see the README inside each service folder.

---

## Author

**Farshad ForutanRad** & **Ata Azamparsa**  
Project for the university course:  
**Large-Scale Systems & Microservice Architecture**