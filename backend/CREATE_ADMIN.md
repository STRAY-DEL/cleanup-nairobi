# Creating an Admin User

This guide explains how to create an initial admin user for the Cleanup Nairobi application.

## Default Admin Credentials

The default admin credentials are:
- **Email**: `admin@gmail.com`
- **Password**: `12345678`

## Prerequisites

Before creating an admin user, ensure that:

1. Your Supabase database is set up and configured
2. Your `backend/.env` file contains the required environment variables:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

## Method 1: Using the Admin Creation Script (Recommended)

1. **Run the admin creation script**:

   ```bash
   cd backend
   node create-admin.js
   ```

2. The script will:
   - Check if an admin user with the email `admin@gmail.com` already exists
   - If the user exists, it will update their role to `admin`
   - If the user doesn't exist, it will create a new admin user
   - Display the admin credentials after successful creation

## Method 2: Manual Registration and Role Update

1. **Register a new user** using the registration API endpoint:
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Admin User",
       "email": "admin@gmail.com",
       "password": "12345678",
       "phone": "+254700000000",
       "location": "Nairobi",
       "role": "user"
     }'
   ```

2. **Update the user role manually** using the Supabase dashboard or a direct database query:
   - Go to your Supabase dashboard
   - Navigate to the `users` table
   - Find the user with email `admin@gmail.com`
   - Update the `role` field to `admin`

## After Creating the Admin User

1. **Login to the admin dashboard**:
   - Visit your application
   - Login with the admin credentials
   - Access the admin dashboard at `/admin/dashboard`

2. **Security recommendation**: 
   - Once logged in, change the default password immediately
   - Update the admin profile as needed

## Troubleshooting

- If you get an error about missing environment variables, ensure your `.env` file is properly configured
- If the script reports that the user already exists, it will automatically update their role to admin
- Make sure your Supabase database is accessible and the `users` table exists

## Environment Configuration

If you need to set up your environment variables for the first time:

1. Copy the example environment file:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Update the `.env` file with your Supabase credentials:
   - Get your Supabase URL and keys from your Supabase project dashboard
   - Set a strong `JWT_SECRET` for production use