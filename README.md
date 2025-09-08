# Subscription Tracker Backend API

This is a RESTful backend API for managing user subscriptions. It provides authentication, user management, and subscription CRUD operations with built-in rate limiting.

## Features

- **Authentication**
  - User sign-up and login with JWT-based authorization
- **User Management**
  - Create and edit user accounts
- **Subscription Management**
  - Create, retrieve, update, and delete subscriptions
- **Security**
  - Integrated Arcjet for rate limiting and bot protection

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT
- **Rate Limiting:** Arcjet
