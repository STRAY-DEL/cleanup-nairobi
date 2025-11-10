import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
import { TABLES, USER_ROLES } from '../config/database.js';

// Verify JWT token and attach user to request
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const token = authHeader.substring(7);

    // Verify token with Supabase
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Get user profile from our custom users table
    const { data: profile, error: profileError } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return res.status(401).json({
        success: false,
        message: 'User profile not found'
      });
    }

    // Attach user profile to request
    req.user = profile;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message
    });
  }
};

// Check if user has required role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Middleware to check if user is admin
export const isAdmin = authorize(USER_ROLES.ADMIN);

// Middleware to check if user is driver
export const isDriver = authorize(USER_ROLES.DRIVER, USER_ROLES.ADMIN);

// Middleware to check if user is authenticated (any role)
export const isAuthenticated = authenticate;

export default {
  authenticate,
  authorize,
  isAdmin,
  isDriver,
  isAuthenticated
};
