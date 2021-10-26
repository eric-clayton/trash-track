const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/home')
});

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'));
});

router.get('/find', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'));
});

router.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'public', 'index.html'));
});

module.exports = router;
