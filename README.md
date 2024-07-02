# OTP Project

This project provides an implementation of generating and validating One-Time Passwords (OTPs)
through email,utilizing an external API for added functionality. The backend is built with
Node.js and Express, and the frontend is developed using React.

## Prerequisites
- Node.js
- npm (Node package manager)
- MongoDB
- An email account for sending OTPs (e.g., Ethereal for testing)
- API key for WeatherAPI

## Technologies Used
- Backend: Node.js, Express, Mongoose
- Frontend: React, CSS Modules
- Email: Nodemailer, Ethereal (for testing)
- Database: MongoDB

## External API
This project uses WeatherAPI to generate OTPs. The current temperature of randomly selected cities
is used as a basis for generating OTPs. You need to sign up and get an API key from WeatherAPI to
use it in this project.

## Tests
This project includes basic tests for the backend API routes using Jest and Supertest. These tests
cover OTP generation and validation functionality to ensure the backend operates correctly.
