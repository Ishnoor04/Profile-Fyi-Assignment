# Profile-Fyi-Assignment

This project is an e-commerce shopping cart application built using Next.js. It features a product listing page displaying various products with details and an "Add to Cart" functionality. The application also includes a dedicated cart page where users can manage items, adjust quantities, remove products, and calculate the total price, including potential discounts, all integrated with a backend API.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- **User Authentication**: Secure user authentication with JWT tokens.
- **Cart Management**: Add, update, remove items in the cart with backend synchronization.
- **Coupon Handling**: Apply and remove discount coupons to calculate savings.
- **Responsive UI**: Fully responsive design for optimal user experience across devices.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **Redux Toolkit**: For state management, including `createSlice` and `createAsyncThunk`.
- **JavaScript (ES6+)**: The primary programming language for the project.
- **Tailwind CSS**: For styling components.

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ishnoor04/Profile-Fyi-Assignment.git
   cd Profile-Fyi-Assignment

   ```

2. Install the dependencies:
```bash
   npm install
or
yarn install
```
3. Create a .env.local file in the root directory and add the required environment variables:
```bash
MONGODB_URI=<your_connection_string>
JWT_SECRET=<your_jwt_secret>
```


4. Start the development server:
```bash
npm run dev
# or
yarn dev
```
5. Open http://localhost:3000 in your browser to view the app.

## Available Scripts

- **`dev`**: Starts the development server.
- **`build`**: Builds the application for production.

## API Endpoints

- **GET `/api/cart`**: Fetch the user's cart.
- **POST `/api/cart`**: Add, update, or remove items in the cart.
- **POST `/api/auth/login`**: Authenticate the user and return a JWT token.
- **POST `/api/auth/signup`**: Register a new user and return a JWT token.
- **GET `/api/auth/me`**: Retrieve the authenticated user's profile using the provided JWT token.

