const express = require('express');
const { coordClosest } = require('../util');
const { canAddCoord } = require('../util');
const { isCoord } = require('../db/schemaChecker');
const mongo = require('../db/db');

const router = express.Router();

router.get('/api', (_req, res) => {
  res.send('welcome to the api!');
});

// ex. /api/nearby?lat=21&lng=23
router.get('/api/nearby', async (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;

  if (!lat || !lng) {
    res.status(400).json({ error: 'Invalid query parameters...' });
    return;
  }

  res.json(await coordClosest({ lat, lng }));
});

// /api/add
router.post('/api/add', async (req, res) => {
  if (!isCoord(req.body)) {
    res.status(400).json({ error: 'Invalid json request...' });
    return;
  }

  const lat = req.body.lat;
  const lng = req.body.lng;

  const minDistance = 20; // distance in meters

  if (await canAddCoord({ lat, lng }, minDistance)) {
    const db = mongo.get();
    db.collection('coordinates').insertOne({ lat, lng });
    res.status(201).json({ message: 'Success adding coordinates!' });
  } else {
    res.status(200).json({ message: 'Nearby bin already exists, try a different location!' });
  }
});

module.exports = router;
