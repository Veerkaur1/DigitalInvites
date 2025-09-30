const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');
const { authenticateUser } = require('../middleware/auth');

// Get current user's profile
router.get('/me', authenticateUser, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get profile
router.get('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;

  // Input validation
  if (!id) {
    return res.status(400).json({ error: 'Profile ID is required' });
  }

  // Basic UUID format validation
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return res.status(400).json({ error: 'Invalid profile ID format' });
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update profile
router.put('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { full_name, username, avatar_url } = req.body;

  // Input validation
  if (!id) {
    return res.status(400).json({ error: 'Profile ID is required' });
  }

  // Basic UUID format validation
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return res.status(400).json({ error: 'Invalid profile ID format' });
  }

  // Validate required fields
  if (!full_name && !username && !avatar_url) {
    return res.status(400).json({ error: 'At least one field (full_name, username, avatar_url) is required for update' });
  }

  // Validate field formats
  if (full_name && typeof full_name !== 'string') {
    return res.status(400).json({ error: 'Full name must be a string' });
  }

  if (username && typeof username !== 'string') {
    return res.status(400).json({ error: 'Username must be a string' });
  }

  if (username && username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long' });
  }

  if (avatar_url && typeof avatar_url !== 'string') {
    return res.status(400).json({ error: 'Avatar URL must be a string' });
  }

  // Basic URL validation for avatar_url
  if (avatar_url && !avatar_url.match(/^https?:\/\/.+/)) {
    return res.status(400).json({ error: 'Avatar URL must be a valid HTTP/HTTPS URL' });
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ full_name, username, avatar_url })
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Profile updated!', data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
