const supabase = require('../supabaseClient');

const authenticateUser = async (req, res, next) => {
  try {
    // Extract JWT token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'No token provided. Please include Authorization header with Bearer token.' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Invalid token format. Please provide a valid Bearer token.' 
      });
    }
    
    // Verify the token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ 
        error: 'Invalid or expired token. Please login again.' 
      });
    }
    
    if (!user) {
      return res.status(401).json({ 
        error: 'User not found. Please login again.' 
      });
    }

    // Add user info to request object for use in route handlers
    req.user = user;
    
    // Set the user context for Supabase RLS policies
    // This is crucial for RLS policies to work correctly
    supabase.auth.setAuth(token);
    
    next(); // Continue to the route handler
  } catch (err) {
    console.error('Authentication middleware error:', err);
    res.status(401).json({ 
      error: 'Authentication failed. Please try again.' 
    });
  }
};

// Optional: Middleware to make authentication optional (for public endpoints)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided, continue without authentication
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      req.user = null;
      return next();
    }
    
    // Try to verify the token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      // Invalid token, continue without authentication
      req.user = null;
      return next();
    }

    // Valid token, set user context
    req.user = user;
    supabase.auth.setAuth(token);
    
    next();
  } catch (err) {
    // Error occurred, continue without authentication
    req.user = null;
    next();
  }
};

module.exports = { 
  authenticateUser, 
  optionalAuth 
};
