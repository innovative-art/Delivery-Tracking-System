# 🚚 Delivery Tracking System

A full-stack web application designed to manage and track delivery orders in real time. The system provides dedicated dashboards for Customers, Delivery Agents, and Administrators, enabling seamless order management, assignment, and live tracking throughout the delivery lifecycle.

---

## 📖 Overview

The Delivery Tracking System helps streamline logistics operations by providing real-time visibility into order progress. Customers can place and track orders, agents can update delivery statuses, and administrators can manage and assign deliveries efficiently.

The application is built using **React.js**, **Spring Boot**, **MySQL**, and **JWT Authentication**, following a secure and scalable architecture.

---

## ✨ Key Features

### 👤 Customer Features

* User Registration & Login
* Secure JWT Authentication
* Create Delivery Orders
* View Order History
* Real-Time Order Tracking
* Timeline-Based Tracking Interface
* Track Delivery Status Progression

### 🚚 Agent Features

* View Assigned Orders
* Manage Delivery Tasks
* Update Delivery Status
* Add Delivery Progress Updates
* View Completed Deliveries
* Track Assigned Order History

### 🛠️ Admin Features

* View All Orders
* Assign Orders to Agents
* Monitor Delivery Operations
* Manage Users and Agents
* Track Overall System Activity

### 🤖 AI-Based Features

* Priority-based Order Handling
* Intelligent Delivery Prioritization
* Faster Processing of Urgent Deliveries
* Improved Resource Allocation
* Foundation for Future AI Optimization

---

## 🔄 Delivery Workflow

1. Customer registers and logs into the system.
2. Customer creates a delivery order.
3. Order is stored with initial status **PLACED**.
4. Admin assigns the order to a delivery agent.
5. Agent updates delivery progress through different stages:

   * CONFIRMED
   * ASSIGNED
   * SHIPPED
   * OUT_FOR_DELIVERY
   * DELIVERED
6. Each update is recorded in the tracking history.
7. Customer tracks the order in real time through the tracking dashboard.

---

## 🏗️ System Architecture

### Frontend

* React.js
* React Router
* CSS

### Backend

* Spring Boot
* Spring Security
* JWT Authentication
* REST APIs
* JPA / Hibernate

### Database

* MySQL

---

## 🔐 Security Features

* JWT-Based Authentication
* Role-Based Authorization
* Protected API Endpoints
* Secure Password Storage
* Refresh Token Support
* Spring Security Integration

---

## 🗄️ Database Design

### Users

Stores customer, admin, and agent information.

### Orders

Stores delivery order details and status.

### Order Assignment

Maintains agent assignment records.

### Order Tracking

Stores complete delivery tracking history.

### Refresh Tokens

Manages user sessions securely.

---

## 📡 REST API Modules

### Authentication

* User Registration
* User Login
* Token Refresh

### Customer

* Create Order
* View Orders
* Track Order

### Agent

* View Assigned Orders
* Update Delivery Status

### Admin

* View All Orders
* Assign Orders
* Manage Agents

---

## 📊 Order Status Lifecycle

```text
PLACED
  ↓
CONFIRMED
  ↓
ASSIGNED
  ↓
SHIPPED
  ↓
OUT_FOR_DELIVERY
  ↓
DELIVERED
```

---

## 🧪 Testing

The application was tested using:

* Postman API Testing
* Backend Endpoint Validation
* Frontend Integration Testing
* Database Verification
* End-to-End Workflow Testing

---

## 🚀 Technologies Used

| Technology      | Purpose                        |
| --------------- | ------------------------------ |
| Java            | Backend Development            |
| Spring Boot     | REST API Development           |
| Spring Security | Authentication & Authorization |
| JWT             | Secure User Authentication     |
| Hibernate/JPA   | ORM & Database Access          |
| MySQL           | Database                       |
| React.js        | Frontend Development           |
| CSS             | UI Styling                     |
| Postman         | API Testing                    |
| Git & GitHub    | Version Control                |

---

## 📈 Future Enhancements

* Google Maps Integration
* Live GPS Tracking
* Push Notifications
* Mobile Application
* AI-Based Route Optimization
* Predictive Delivery Time Estimation
* Real-Time WebSocket Updates
* Advanced Analytics Dashboard

---

## 👨‍💻 Author

**Dhavalashree Jain L A**

Java Full Stack Developer

---

## 📜 License

This project was developed as part of a Java Full Stack Development internship and academic learning experience.
