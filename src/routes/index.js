const express = require('express');
const { loadData } = require('../controllers/loadController');
const { deleteAllUsers, deleteUserById, getUserById, createUser } = require('../controllers/userController');

const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.send('Welcome to the Node.js Assignment Server!');
});

// Other routes
router.get('/load', async (req, res) => {
  try {
    await loadData();
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/users', async (req, res) => {
  try {
    await deleteAllUsers();
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/users/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    await deleteUserById(userId);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/users', async (req, res) => {
  try {
    const user = req.body;
    await createUser(user);
    res.status(201).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;