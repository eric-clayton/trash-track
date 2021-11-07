const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (_req, res) => {
    // Successful authentication
    res.redirect('/profile');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
