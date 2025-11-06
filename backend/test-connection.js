import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

console.log('🔍 Testing Supabase Connection...\n');

// Check environment variables
console.log('Environment Variables:');
console.log('- SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing');
console.log('- SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');
console.log('- SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log('- PORT:', process.env.PORT || '5000 (default)');
console.log();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error('❌ Missing required Supabase environment variables!');
  console.error('\nPlease ensure your backend/.env file contains:');
  console.error('SUPABASE_URL=your_supabase_url');
  console.error('SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.error('SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key');
  console.error('JWT_SECRET=your_jwt_secret');
  process.exit(1);
}

// Test Supabase connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

console.log('Testing database connection...');

try {
  // Try to query the users table
  const { data, error } = await supabase
    .from('users')
    .select('count')
    .limit(1);

  if (error) {
    console.error('❌ Database connection failed!');
    console.error('Error:', error.message);
    console.error('\nPossible issues:');
    console.error('1. The "users" table does not exist in your Supabase database');
    console.error('2. Invalid Supabase credentials');
    console.error('3. Network connectivity issues');
    console.error('\nPlease run the SQL script from SETUP_GUIDE.md to create the users table.');
  } else {
    console.log('✅ Database connection successful!');
    console.log('✅ Users table exists and is accessible');
  }
} catch (err) {
  console.error('❌ Unexpected error:', err.message);
}

console.log('\n✅ Connection test complete!');
process.exit(0);
