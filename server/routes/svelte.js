const express = require('express');
const path = require('path');

const { ensureAuthenticated } = require('../util');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'));
});

router.get('/find', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'));
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'));
});

router.get('/profile', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'));
});

router.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'));
});

module.exports = router;
