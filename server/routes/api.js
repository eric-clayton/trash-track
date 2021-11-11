const express = require('express');
const { coordClosest } = require('../util');
const { canAddCoord } = require('../util');
const { ensureAuthenticatedJson, ensureAuthenticatedNoUsernameJson, findUser } = require('../util');
const { Bin } = require('../db/schema/Bin');
const { isUser, isCoord } = require('../db/schemaChecker');
const mongo = require('../db/db');

const router = express.Router();

router.get('/api', (_req, res) => {
  res.send('welcome to the api!');
});

// ex. /api/nearby/trash?lat=21&lng=23 (trash or recycle)
router.get('/api/nearby/:bintype', async (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  const bintype = req.params.bintype;

  if (!bintype || (bintype !== 'trash' && bintype !== 'recycle')) {
    res.status(400).json({ error: 'Invalid url parameters, use "trash" or "recycle"' });
    return;
  }

  if (!lat || !lng) {
    res.status(400).json({ error: 'Invalid query parameters...' });
    return;
  }

  const isRecycle = bintype === 'trash' ? 0 : 1;

  res.json(await coordClosest({ lat, lng }, isRecycle));
});

// /api/add/trash or /api/add/recycle
router.post('/api/add/:bintype', ensureAuthenticatedJson, async (req, res) => {
  if (!isCoord(req.body)) {
    res.status(400).json({ error: 'Invalid json request...' });
    return;
  }

  const lat = req.body.lat;
  const lng = req.body.lng;
  const bintype = req.params.bintype;
  const minMinutes = 10; // minutes

  if (!bintype || (bintype !== 'trash' && bintype !== 'recycle')) {
    res.status(400).json({ error: 'Invalid url parameters, use "trash" or "recycle"' });
    return;
  }

  try {
    const db = mongo.get();

    const minTime = minMinutes*1000*60;
    const user = await findUser(req.user.googleID);
    const curDate = new Date();
    const timeLastAdded = user.timeLastAdded;

    if ((curDate - timeLastAdded) < minTime) {
      res.status(429).json({ error: `Must wait ${minMinutes} minutes between "add" requests.` });
      return;
    }

    const minDistance = 20; // distance in meters
    const isRecycle = bintype === 'trash' ? 0 : 1;

    if (await canAddCoord({ lat, lng }, minDistance)) {
      const username = (await db.collection('users').findOne({ googleID: req.user.googleID }))
        .username;
      const bin = new Bin(lat, lng, isRecycle, username);
      await db
        .collection('users')
        .updateOne({ googleID: req.user.googleID }, { $currentDate: { timeLastAdded: true } });
      await db.collection('bins').insertOne(bin);
      res.status(201).json({ message: 'Success adding bin!' });
    } else {
      res.status(200).json({ message: 'Nearby bin already exists, try a different location!' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Something went wrong on our end, please try again :(' });
  }
});

router.patch('/api/update', ensureAuthenticatedNoUsernameJson, async (req, res) => {
  try {
    const db = mongo.get();
    const user = await findUser(req.user.googleID);
    if (!user.username || user.username === '') {
      if (!req.body.username || req.body.username === '') {
        res.status(403).json({ error: 'Username must be provided...' });
        return;
      } else {
        const matchingUser = await db.collection('users').findOne({username: req.body.username});
        if (matchingUser) {
          res.status(406).json({ error: 'Username already exists, try another one...' });
          return;
        } else {
          await db.collection('users').updateOne({ googleID: req.user.googleID }, { $set: { username: req.body.username } });
          res.status(201).json({ message: 'Success updating username!' });
          return;
        }
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Something went wrong on our end, please try again :(' });
  }
});

router.get('/api/username', ensureAuthenticatedJson, async (req, res) => {
  try {
    const user = await findUser(req.user.googleID);
    res.json({ username: user.username });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Something went wrong on our end, please try again :(' });
  }
});

module.exports = router;
