# Design Explanation

## Overview

This document provides an overview of the design decisions made in the development of the microservices project for retrieving country names based on the official currency using Node.js, Express.js, and third-party integrations.

## Project Structure

The project is structured following a modular approach, separating concerns into different directories:

- `controllers`: Contains the application logic for handling HTTP requests and responses.
- `middleware`: Holds middleware functions, such as the Bearer Authentication middleware for securing endpoints.
- `services`: Encapsulates the logic for interacting with external services or APIs, specifically the REST Countries API in this case.
- `tests`: Includes test files for ensuring the correctness and reliability of the implemented features.

## Bearer Authentication Middleware

The Bearer Authentication middleware (`bearerAuthMiddleware.js`) is responsible for securing endpoints by validating the presence and correctness of the provided token in the `Authorization` header. The token is read from environment variables, allowing for easy configuration.