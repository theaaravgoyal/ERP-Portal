const express = require('express');
const router = express.Router();
const { login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateLoginInput } = require('../validators/authValidator');

router.post('/login', validateLoginInput, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;
