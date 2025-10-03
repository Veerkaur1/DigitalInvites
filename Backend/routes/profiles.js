const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// ✅ 1. Get all profiles
router.get('/me', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*'); // fetch all rows

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ 2. Get single profile by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Profile ID is required' });
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

// ✅ 3. Update profile by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { full_name, company_name, avatar_url } = req.body;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ full_name, company_name, avatar_url })
      .eq('id', id)
      .select()
      .single(); // always return one updated row

    if (error) throw error;
    res.json({ message: 'Profile updated!', data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
