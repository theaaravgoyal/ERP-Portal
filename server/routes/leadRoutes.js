const express = require('express');
const router = express.Router();
const { createLead, getLeads, deleteLead, updateLeadStatus } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

// Public endpoints
router.post('/', createLead);

// Protected endpoints
router.get('/', protect, getLeads);
router.delete('/:id', protect, deleteLead);
router.put('/:id', protect, updateLeadStatus);

module.exports = router;
