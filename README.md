# User Enquiry System

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing user enquiries.

## Features

- Create new enquiries
- View all enquiries in a table format
- Edit existing enquiries
- Delete enquiries with confirmation

## Tech Stack

**Frontend:**
- React.js
- Vite
- Tailwind CSS
- Flowbite React

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   DBURL=your_mongodb_connection_string
   PORT=8001
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Make sure MongoDB is running
2. Start the backend server
3. Start the frontend development server
4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## API Endpoints

- `POST /api/website/enquiries/insert` - Create a new enquiry
- `GET /api/website/enquiries/list` - Get all enquiries
- `PUT /api/website/enquiries/update/:id` - Update an enquiry
- `DELETE /api/website/enquiries/delete/:id` - Delete an enquiry

## Deployment

This project can be deployed to various platforms:

### Backend Deployment Options:
- Heroku
- Render
- AWS Elastic Beanstalk
- DigitalOcean App Platform

### Frontend Deployment Options:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## Environment Variables

### Backend (.env)
- `DBURL` - MongoDB connection string
- `PORT` - Server port (default: 8001)