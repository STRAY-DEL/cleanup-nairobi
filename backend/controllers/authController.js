import { supabase } from '../config/supabase.js';
import { TABLES, USER_ROLES } from '../config/database.js';
import { hashPassword, comparePassword, generateToken, successResponse, errorResponse } from '../utils/helpers.js';

// Register new user
export const register = async (req, res) => {
  try {
    console.log('📝 Registration request received:', { 
      fullName: req.body.fullName, 
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location 
    });

    const { fullName, email, password, phone, location, role = USER_ROLES.USER } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !phone || !location) {
      console.error('❌ Missing required fields');
      return errorResponse(res, 'All fields are required', 400);
    }

    // Check if user already exists
    console.log('🔍 Checking if user exists...');
    const { data: existingUser, error: checkError } = await supabase
      .from(TABLES.USERS)
      .select('id')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is what we want
      console.error('❌ Error checking existing user:', checkError);
      return errorResponse(res, 'Database error while checking user', 500);
    }

    if (existingUser) {
      console.log('❌ User already exists');
      return errorResponse(res, 'User with this email already exists', 409);
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await hashPassword(password);

    // Create user
    console.log('💾 Creating user in database...');
    const { data: user, error } = await supabase
      .from(TABLES.USERS)
      .insert([
        {
          full_name: fullName,
          email,
          password: hashedPassword,
          phone,
          location,
          role,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Database insert error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return errorResponse(res, `Failed to create user: ${error.message}`, 500);
    }

    console.log('✅ User created successfully:', user.id);

    // Generate token
    console.log('🎫 Generating JWT token...');
    const token = generateToken(user.id, user.role);

    // Remove password from response
    delete user.password;

    console.log('✅ Registration completed successfully');
    return successResponse(
      res,
      {
        user,
        token
      },
      'User registered successfully',
      201
    );
  } catch (error) {
    console.error('❌ Unexpected registration error:', error);
    console.error('Error stack:', error.stack);
    return errorResponse(res, `Registration failed: ${error.message}`, 500);
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const { data: user, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken(user.id, user.role);

    // Remove password from response
    delete user.password;

    return successResponse(res, {
      user,
      token
    }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse(res, 'Login failed', 500);
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: user, error } = await supabase
      .from(TABLES.USERS)
      .select('id, full_name, email, phone, location, role, avatar_url, points, created_at')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return errorResponse(res, 'User not found', 404);
    }

    return successResponse(res, user, 'Profile retrieved successfully');
  } catch (error) {
    console.error('Get profile error:', error);
    return errorResponse(res, 'Failed to get profile', 500);
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, phone, location, avatarUrl } = req.body;

    const updateData = {};
    if (fullName) updateData.full_name = fullName;
    if (phone) updateData.phone = phone;
    if (location) updateData.location = location;
    if (avatarUrl) updateData.avatar_url = avatarUrl;

    const { data: user, error } = await supabase
      .from(TABLES.USERS)
      .update(updateData)
      .eq('id', userId)
      .select('id, full_name, email, phone, location, role, avatar_url, points, created_at')
      .single();

    if (error) {
      console.error('Update profile error:', error);
      return errorResponse(res, 'Failed to update profile', 500);
    }

    return successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    console.error('Update profile error:', error);
    return errorResponse(res, 'Failed to update profile', 500);
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const { data: user, error } = await supabase
      .from(TABLES.USERS)
      .select('password')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return errorResponse(res, 'User not found', 404);
    }

    // Verify current password
    const isPasswordValid = await comparePassword(currentPassword, user.password);

    if (!isPasswordValid) {
      return errorResponse(res, 'Current password is incorrect', 401);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    const { error: updateError } = await supabase
      .from(TABLES.USERS)
      .update({ password: hashedPassword })
      .eq('id', userId);

    if (updateError) {
      console.error('Change password error:', updateError);
      return errorResponse(res, 'Failed to change password', 500);
    }

    return successResponse(res, null, 'Password changed successfully');
  } catch (error) {
    console.error('Change password error:', error);
    return errorResponse(res, 'Failed to change password', 500);
  }
};

export default {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
};
