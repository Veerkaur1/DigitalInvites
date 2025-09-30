const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    res.json({ message: 'Signup successful!', user: data.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.json({ message: 'Login successful!', session: data.session });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Resend email verification
router.post('/resend-verification', async (req, res) => {
  const { email } = req.body;

  // Input validation
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    });

    if (error) throw error;

    res.json({ message: 'Verification email sent successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Verify email with token
router.post('/verify-email', async (req, res) => {
  const { token, type } = req.body;

  // Input validation
  if (!token || !type) {
    return res.status(400).json({ error: 'Token and type are required' });
  }

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: type
    });

    if (error) throw error;

    res.json({ 
      message: 'Email verified successfully!', 
      user: data.user 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    // Supabase handles session invalidation automatically
    res.json({ message: 'Logout successful!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Request password reset
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Input validation
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`
    });

    if (error) throw error;

    res.json({ message: 'Password reset email sent successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Reset password with token
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  // Input validation
  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'recovery'
    });

    if (error) throw error;

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (updateError) throw updateError;

    res.json({ message: 'Password reset successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
