# Drink Shop - E-commerce Platform

A modern e-commerce platform for beverages built with React (Vite) frontend and Laravel backend.

## 📁 Project Structure

\`\`\`
├── final-project/          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── lib/           # API client and utilities
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── laravel-docker/         # Laravel Backend
    ├── app/               # Laravel application
    ├── database/          # Migrations and seeders
    ├── routes/            # API routes
    ├── docker-compose.yml # Docker configuration
    └── Dockerfile
\`\`\`

## 🚀 Quick Start

### Backend Setup (Laravel + Docker)

\`\`\`bash
cd laravel-docker
chmod +x setup.sh
./setup.sh
\`\`\`

### Frontend Setup (React + Vite)

\`\`\`bash
cd final-project
chmod +x setup.sh
./setup.sh
npm run dev
\`\`\`

## 🔗 Access Points

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- phpMyAdmin: http://localhost:8080

## 👤 Demo Accounts

- Admin: admin@drink.com / password
- Customer: customer@drink.com / password

## ✨ Features

### 🛒 E-commerce Features
- Product catalog with categories
- Shopping cart (login required)
- User authentication (JWT)
- Admin dashboard
- Product management (CRUD)

### 🔐 Authentication
- Role-based access (admin/customer)
- JWT token authentication
- Protected routes
- Login required for cart operations

### 🎨 Frontend (React + Vite)
- Modern React with Hooks
- Tailwind CSS styling
- Responsive design
- Component-based architecture
- React Router for navigation

### 🔧 Backend (Laravel + Docker)
- Laravel 11 API
- MySQL database
- Docker containerization
- RESTful API endpoints
- Database migrations and seeders

## 📱 Usage

1. Browse Products: View featured products and categories
2. Login: Use demo accounts or register new account
3. Add to Cart: Login required to add products to cart
4. Admin Access: Login as admin to access dashboard
5. Manage Products: Add, edit, delete products (admin only)

## 🛠 Development

### Frontend Commands
\`\`\`bash
cd final-project
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
\`\`\`

### Backend Commands
\`\`\`bash
cd laravel-docker
docker-compose up -d              # Start containers
docker-compose exec app php artisan migrate  # Run migrations
docker-compose exec app php artisan db:seed  # Seed database
\`\`\`

## 🔄 API Endpoints

### Public
- GET /api/products - Get products
- GET /api/categories - Get categories
- POST /api/login - User login
- POST /api/register - User registration

### Protected (Login Required)
- GET /api/cart - Get user cart
- POST /api/cart - Add to cart
- DELETE /api/cart/{id} - Remove from cart

### Admin Only
- POST /api/products - Create product
- PUT /api/products/{id} - Update product
- DELETE /api/products/{id} - Delete product

## 🎯 Key Features

✅ Login Required for Cart - Users must authenticate before adding items to cart
✅ Admin Dashboard - Full product management with CRUD operations  
✅ Role-Based Access - Different permissions for admin and customer users
✅ Real Database - MySQL with proper relationships and constraints
✅ Docker Setup - Easy deployment with Docker containers
✅ Modern Frontend - React with Vite for fast development
✅ API-First - Clean separation between frontend and backend

Perfect for learning modern web development with React and Laravel! 🎉
\`\`\`

## 🎉 Complete Setup Summary:

### Project Structure:
\`\`\`
📁 final-project/          # React Frontend (Vite + JSX)
📁 laravel-docker/         # Laravel Backend (Docker + MySQL)
\`\`\`

### Setup Commands:

Backend:
\`\`\`bash
cd laravel-docker
chmod +x setup.sh
./setup.sh
\`\`\`

Frontend:
\`\`\`bash
cd final-project
npm install
npm run dev
\`\`\`

### Access Points:
- Frontend: http://localhost:5173 (Vite dev server)
- Backend: http://localhost:8000 (Laravel API)
- Database: http://localhost:8080 (phpMyAdmin)

### Key Features:
✅ Separate folders as requested
✅ Vite React frontend with .jsx files
✅ Laravel Docker backend with MySQL
✅ Login required for cart operations
✅ Admin dashboard with product management
✅ Role-based authentication
✅ Complete CRUD operations

The project is now structured exactly as you requested with two separate folders! 🚀