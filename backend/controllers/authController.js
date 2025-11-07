import { supabase, supabaseAdmin } from '../config/supabase.js';
import { TABLES, USER_ROLES } from '../config/database.js';
import { hashPassword, comparePassword, generateToken, successResponse, errorResponse } from '../utils/helpers.js';

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phone, location, role = USER_ROLES.USER } = req.body;

    // Check if user already exists using admin client (server-side)
    const { data: existingUser, error: existingError } = await supabaseAdmin
      .from(TABLES.USERS)
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingError) {
      console.error('Error checking existing user:', existingError);
      return errorResponse(res, 'Failed to validate user', 500);
    }

    if (existingUser) {
      return errorResponse(res, 'User with this email already exists', 409);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user using admin client to ensure insert succeeds regardless of RLS
    const { data: user, error } = await supabaseAdmin
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
      .maybeSingle();

    if (error) {
      console.error('Registration error:', error);
      return errorResponse(res, 'Failed to create user', 500);
    }

    // Generate token
    const token = generateToken(user.id, user.role);

    // Remove password from response
    delete user.password;

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
    console.error('Register error:', error);
    return errorResponse(res, 'Registration failed', 500);
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
