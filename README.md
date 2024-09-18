# ConklinOfficial Landing Page and TekkAI Chatbot

This project consists of a Next.js frontend for the ConklinOfficial landing page and a Spring Boot backend for handling Stripe payments and potentially other server-side operations.

## Project Structure

- `nextjs-frontend/`: Next.js frontend application
- `spring-backend/`: Spring Boot backend application

## Frontend (Next.js)

### Getting Started

1. Navigate to the `nextjs-frontend` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Features

- Responsive landing page
- TekkAI Chatbot interface
- Integration with Stripe for payments

### Technologies Used

- Next.js 14.2.5
- React 18
- Tailwind CSS
- Stripe.js

## Backend (Spring Boot)

### Getting Started

1. Navigate to the `spring-backend` directory
2. Ensure you have Java 17 installed
3. Run the application:
   ```bash
   ./gradlew bootRun
   ```

### Features

- Stripe payment integration
- RESTful API endpoints for payment processing

### Technologies Used

- Spring Boot 3.3.3
- Java 17
- Stripe Java SDK 22.0.0
- PostgreSQL (for database, if applicable)

## Environment Setup

1. For the frontend, create a `.env.local` file in the `nextjs-frontend` directory with your Stripe publishable key:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

2. For the backend, create a `.env` file in the `spring-backend` directory with your Stripe secret key:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

## Deployment

- Frontend: Deploy the Next.js app to Vercel or your preferred hosting platform
- Backend: Deploy the Spring Boot application to a Java-compatible server (e.g., AWS, Heroku)