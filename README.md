# Registration and Login System with Node.js and PostgreSQL

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction

The primary objective of this project is to create a secure and user-friendly authentication system using Node.js and PostgreSQL. 
The project aims to provide a robust backend architecture and frontend interface for user registration and authentication processes.

## Technologies Used

Outline the technologies, programming languages, frameworks, and tools used in the project.

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: PostgreSQL, Sequelize ORM
- Authentication: bcrypt, jsonwebtoken

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ParZival6677/Register-Login-System.git
    ```

2. Install dependencies:

    ```bash
    cd backend
    init -y
    npm install express sequelize pg pg-hstore nodemon bcrypt dotenv jsonwebtoken cookie-parser
    ```

3. Setup environment variables:

    - Create a `.env` file in the `backend` directory.
    - Write in the `.env` file `secretKey = secret` (any value)


## Usage

1. Database Configuration

    - Open index.js in the models directory and configure the database connection

    `const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres database connection`

2. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

3. Open the html page:

    ```bash
    start http://localhost:8000/login.html
    ```

## API Endpoints


1. `GET /api/users`: 

- **Description**: Retrieves a list of users.

- **Request**: No request body required.

- **Response**:

   - **Status**: 200 OK

   - **Content**: List of users in JSON format.


2. `POST /api/users/login`: 

- **Description**: Authenticates a user for login.

- **Request**:

   - **Format**: JSON

   - **Body**:

   ```bash 
     "email": "user@example.com",
     "password": "password123"
   ```

- **Response**:

   - **Status**: 200 OK

   - **Content**: JSON with user details and a success message.


3.  `POST /api/users/signup`: Description: Registers a new user.

- **Description**: Registers a new user.

- **Request**:

   - **Format**: JSON

   - **Body**:

   ```bash 
     "userName": "Dias",
     "email": "dias@example.com",
     "password": "password123"
   ```

- **Response**:

   - **Status**: 201 created

   - **Content**: JSON with user details and a success message.


