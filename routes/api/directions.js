const express = require('express');
const router = express.Router();

// @route   GET api/directions/test
// @desc    Test Directions route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Directions Works"}));

module.exports = router;