const express = require('express');
const router = express.Router();

const { coordClosest } = require('../util');

const testPoints = [
  { lat: 29.6488, lng: -82.3433 }, // century tower
  { lat: 29.6465, lng: -82.3479 }, // reitz union
  { lat: 29.6381, lng: -82.3686 }, // southwest rec
  { lat: 29.6481, lng: -82.3437 }, // marston science library
];

router.get('/api', (req, res) => {
  res.send('welcome to the api!');
});

// ex. /api/nearby?lat=21&lng=23
router.get('/api/nearby', (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;


  if (!lat || !lng) {
    res.status(400).json({error: "Invalid query parameters..."});
    return;
  }

  res.json(coordClosest(testPoints, {lat: lat, lng: lng}));
});

module.exports = router;
