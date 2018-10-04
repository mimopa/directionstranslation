const express = require('express');
const router = express.Router();

// @route   GET api/translation/test
// @desc    Test Translation route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Translation Works"}));

module.exports = router;