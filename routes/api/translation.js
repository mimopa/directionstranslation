const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Translation model
const Translation = require('../../models/Translation');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validateTranstationInput = require('../../validation/translation');

// @route   GET api/translation/test
// @desc    Test Translation route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Translation Works' }));

// @route   GET api/translation
// @desc    Get translation
// @access  Public
router.get('/', (req, res) => {
  Translation.find()
    .sort({ date: -1 })
    .then(translations => res.json(translations))
    .catch(err =>
      res.status(404).json({ notranslationsfound: 'No translations found' })
    );
});

// @route   GET api/translation/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Translation.findById(req.params.id)
    .then(translation => res.json(translation))
    .catch(err =>
      res
        .status(404)
        .json({ notranslationfound: 'No translation found with that ID' })
    );
});

// @route   POST api/translation
// @desc    Create translation
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTranslationInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    // Use Amazon Tranlate

    const newTranslation = new Translation({
      transportation: req.body.transportation,
      destination: req.body.destination,
      beforeTranslationText: req.body.beforeTranslationText,
      afterTranslationText: req.body.afterTranslationText
    });

    newTranslation.save().then(translation => res.json(translation));
  }
);

// @route   DELETE api/translation/:id
// @desc    Delete translation
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Translation.findOne({ user: req.user.id }).then(translation => {
      Translation.findById(req.params.id)
        .then(translation => {
          // Check for post owner
          if (translation.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          translation.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ translationnotfound: 'No translation found' })
        );
    });
  }
);

module.exports = router;
