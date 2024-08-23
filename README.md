# Task Management API

## Overview

This API provides a task management system with role-based access control. Users can manage tasks, with administrators having the ability to perform CRUD operations. The API includes user authentication, task management, and role-based permissions.


## Backend URL

[Task Management Backend](https://taskbackend-5fq4.onrender.com/)

## Features

- **User Authentication**:
  - Register and log in users with JWT-based authentication.
  - Secure session management with token handling.
- **Task Management**:
  - Create, read, update, and delete tasks.
  - Task details include title, description, priority, status, and assigned user.
- **Role-Based Access Control**:
  - Only users with the role `admin` can perform CRUD operations on tasks.
  - Regular users can view tasks but cannot modify them.
- **Error Handling**:
  - Proper error responses for invalid requests and unauthorized access.
- **Sample Data**:
  - Includes example requests and responses for various endpoints.

## Backend Endpoints

### Auth Routes

- **POST /api/auth/register**
  - Register a new user.
  - Request body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "role": "admin" // Optional. Defaults to 'user' if not provided.
    }
    ```
  - Response:
    ```json
    {
      "message": "Register successful",
      "user": {
        "_id": "userId",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "admin"
      }
    }
    ```

- **POST /api/auth/login**
  - Log in an existing user.
  - Request body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "accessToken": "jwtToken",
      "refreshToken": "refreshToken",
      "user": {
        "_id": "userId",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "admin"
      }
    }
    ```

- **POST /api/auth/refresh-token**
  - Refresh the access token using a valid refresh token.
  - Request body:
    ```json
    {
      "refreshToken": "refreshToken"
    }
    ```
  - Response:
    ```json
    {
      "accessToken": "newAccessToken"
    }
    ```

- **POST /api/auth/logout**
  - Invalidate the refresh token to log out a user.
  - Request body:
    ```json
    {
      "refreshToken": "refreshToken"
    }
    ```
  - Response:
    ```json
    {
      "message": "User logged out successfully"
    }
    ```

### Task Routes

- **POST /api/tasks**
  - Create a new task. Only accessible to users with the role `admin`.
  - Request body:
    ```json
    {
      "title": "Complete project report",
      "description": "Finish the report and submit it by the end of the week.",
      "priority": "high",
      "status": "pending",
      "assignedTo": "userId" // Optional, user ID to whom the task is assigned.
    }
    ```
  - Response:
    ```json
    {
      "title": "Complete project report",
      "description": "Finish the report and submit it by the end of the week.",
      "priority": "high",
      "status": "pending",
      "assignedTo": "userId"
    }
    ```

- **GET /api/tasks**
  - Fetch all tasks. Includes optional filtering by priority, status, and assigned user.
  - Query parameters:
    - `priority`: Filter tasks by priority (e.g., `low`, `medium`, `high`).
    - `status`: Filter tasks by status (e.g., `pending`, `in progress`, `completed`).
    - `assignedTo`: Filter tasks by assigned user ID.
  - Response:
    ```json
    [
      {
        "title": "Complete project report",
        "description": "Finish the report and submit it by the end of the week.",
        "priority": "high",
        "status": "pending",
        "assignedTo": "userId"
      }
    ]
    ```

- **GET /api/tasks/:id**
  - Fetch a specific task by its ID.
  - Request parameters:
    - `id`: The ID of the task to retrieve.
  - Response:
    ```json
    {
      "title": "Complete project report",
      "description": "Finish the report and submit it by the end of the week.",
      "priority": "high",
      "status": "pending",
      "assignedTo": "userId"
    }
    ```

- **PUT /api/tasks/:id**
  - Update a specific task by its ID. Only accessible to users with the role `admin`.
  - Request body:
    ```json
    {
      "title": "Updated task title",
      "description": "Updated task description",
      "priority": "medium",
      "status": "in progress",
      "assignedTo": "userId"
    }
    ```
  - Response:
    ```json
    {
      "title": "Updated task title",
      "description": "Updated task description",
      "priority": "medium",
      "status": "in progress",
      "assignedTo": "userId"
    }
    ```

- **DELETE /api/tasks/:id**
  - Delete a specific task by its ID. Only accessible to users with the role `admin`.
  - Request parameters:
    - `id`: The ID of the task to delete.
  - Response:
    ```json
    {
      "message": "Task deleted"
    }
    ```

## Roles and Permissions

- **User**:
  - Can view tasks.
  
- **Admin**:
  - Can perform all CRUD operations on tasks.

## Sample Data

### Register Admin User

- **Request Body**:
  ```json
  {
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "adminpassword",
    "role": "admin"
  }
