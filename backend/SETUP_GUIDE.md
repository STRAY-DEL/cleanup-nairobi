# Setup Guide for Cleanup Nairobi Backend

This guide will walk you through setting up the backend service from scratch.

## Step 1: Install Dependencies

Navigate to the backend directory and install all required packages:

```bash
cd backend
npm install
```

## Step 2: Set Up Supabase

### 2.1 Create a Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in your project details:
   - Name: `cleanup-nairobi`
   - Database Password: (choose a strong password)
   - Region: Choose closest to your users
5. Wait for the project to be created

### 2.2 Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

### 2.3 Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the SQL from `DATABASE_SCHEMA.md` section by section
4. Run each section to create the tables

**Important Tables to Create:**
- users
- cleanup_events
- event_participants
- waste_reports
- drivers
- driver_assignments
- locations
- notifications
- rewards
- user_rewards

### 2.4 Create the Points Function

Run this SQL to create the points increment function:

```sql
CREATE OR REPLACE FUNCTION increment_user_points(user_id UUID, points INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET points = points + $2
  WHERE id = $1;
END;
$$ LANGUAGE plpgsql;
```

### 2.5 Set Up Row Level Security (Optional but Recommended)

Enable RLS on sensitive tables:

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE waste_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleanup_events ENABLE ROW LEVEL SECURITY;

-- Add policies as needed (see DATABASE_SCHEMA.md)
```

## Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your values:
   ```env
   # Supabase Configuration
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # JWT Configuration (generate a random string)
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   JWT_EXPIRES_IN=7d

   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

3. Generate a strong JWT secret:
   ```bash
   # On Linux/Mac
   openssl rand -base64 64

   # On Windows (PowerShell)
   [Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
   ```

## Step 4: Seed Initial Data (Optional)

### Create Admin User

You can create an admin user directly in Supabase:

1. Go to **Table Editor** → **users**
2. Click **Insert row**
3. Fill in:
   ```
   full_name: Admin User
   email: admin@cleanupnairobi.com
   password: (hash of your password - use bcrypt)
   phone: 0700000000
   role: admin
   location: Nairobi
   points: 0
   ```

To hash a password, you can use this Node.js script:

```javascript
import bcrypt from 'bcryptjs';
const password = 'your_password_here';
const hash = await bcrypt.hash(password, 10);
console.log(hash);
```

### Add Sample Locations

```sql
INSERT INTO locations (name, latitude, longitude, description) VALUES
('Westlands', -1.2676, 36.8070, 'Westlands area'),
('Kilimani', -1.2921, 36.7872, 'Kilimani residential area'),
('Karen', -1.3197, 36.7070, 'Karen suburb'),
('Eastleigh', -1.2833, 36.8333, 'Eastleigh neighborhood'),
('Kibera', -1.3133, 36.7833, 'Kibera area');
```

## Step 5: Start the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

You should see:
```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🌿 Cleanup Nairobi API Server                      ║
║                                                       ║
║   Server running on port 5000                        ║
║   Environment: development                           ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## Step 6: Test the API

### Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Cleanup Nairobi API is running",
  "timestamp": "2024-11-01T10:00:00.000Z"
}
```

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "0712345678",
    "location": "Westlands"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the token from the response!

### Get Profile (with token)
```bash
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Step 7: Connect Frontend

Update your frontend environment variables to point to the backend:

```env
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, change it in `.env`:
```env
PORT=3001
```

### Database Connection Error
- Verify your Supabase URL and keys are correct
- Check if your Supabase project is active
- Ensure you have internet connection

### JWT Errors
- Make sure JWT_SECRET is set in `.env`
- Verify the token is being sent in the Authorization header
- Check token hasn't expired

### CORS Errors
- Add your frontend URL to ALLOWED_ORIGINS in `.env`
- Restart the server after changing environment variables

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Set up the frontend** to connect to this backend
2. **Create admin dashboard** for managing the system
3. **Implement file upload** for images (use Supabase Storage)
4. **Add email notifications** (use a service like SendGrid)
5. **Set up monitoring** (use services like Sentry)
6. **Deploy to production** (Heroku, Railway, or DigitalOcean)

## Production Deployment Checklist

- [ ] Set NODE_ENV to 'production'
- [ ] Use strong, unique JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set up proper CORS origins
- [ ] Enable Supabase RLS policies
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Set up rate limiting
- [ ] Use environment-specific configurations
- [ ] Set up CI/CD pipeline

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure database tables are created properly
4. Check Supabase dashboard for any issues

For more help, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
