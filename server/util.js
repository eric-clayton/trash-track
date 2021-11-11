const mongo = require('./db/db');
const { User } = require('./db/schema/User');

const degToMeterFactor = 111139;

const coordDistance = (coordObj1, coordObj2) => {
  return Math.sqrt((coordObj2.lat - coordObj1.lat) ** 2 + (coordObj2.lng - coordObj1.lng) ** 2);
};

const coordClosest = async (coordObj, isRecycle) => {
  let closeBin = null;
  let closeDist = Infinity;

  const db = mongo.get();

  await db
    .collection('bins')
    .find()
    .forEach((bin) => {
      if (bin.isRecycle === isRecycle) {
        const tempDist = coordDistance(bin, coordObj);

        if (tempDist < closeDist) {
          closeBin = bin;
          closeDist = tempDist;
        }
      }
    });

  if (closeBin == null) {
    return null;
  }

  return { bin: closeBin, distance: closeDist };
};

const canAddCoord = async (coordObj, distance) => {
  const db = mongo.get();
  let canAdd = true;

  await db
    .collection('bins')
    .find()
    .forEach((coord) => {
      const tempDist = coordDistance(coord, coordObj);

      if (tempDist * degToMeterFactor <= distance) {
        canAdd = false;
      }
    });

  return canAdd;
};

const ensureAuthenticated = (req, res, next) => {
  if (req.user) {
    if (!req.user.username || req.user.username === '') {
      res.redirect('/update');
    } else {
      next();
    }
  } else {
    res.redirect('/login');
  }
};

const ensureAuthenticatedJson = (req, res, next) => {
  if (req.user) {
    if (!req.user.username || req.user.username === '') {
      res.status(403).json({ error: 'User has not set a username...' });
    } else {
      next();
    }
  } else {
    res.status(401).json({ error: 'User not authenticated...' });
  }
};

const ensureAuthenticatedNoUsername = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const ensureAuthenticatedNoUsernameJson = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ error: 'User not authenticated...' });
  }
};

const createUser = async (googleID) => {
  try {
    const db = mongo.get();
    console.log(await db.collection('users').insertOne(new User(googleID)));
  } catch (e) {
    throw new Error('Something went wrong in util.js [createUser()]');
  }
};

const findUser = async (googleID) => {
  const db = mongo.get();
  const user = await db.collection('users').findOne({ googleID });

  return user;
};

const userExists = async (googleID) => {
  if (!(await findUser(googleID))) {
    return false;
  }

  return true;
};

exports.coordDistance = coordDistance;
exports.coordClosest = coordClosest;
exports.canAddCoord = canAddCoord;
exports.createUser = createUser;
exports.findUser = findUser;
exports.userExists = userExists;
exports.ensureAuthenticated = ensureAuthenticated;
exports.ensureAuthenticatedJson = ensureAuthenticatedJson;
exports.ensureAuthenticatedNoUsername = ensureAuthenticatedNoUsername;
exports.ensureAuthenticatedNoUsernameJson = ensureAuthenticatedNoUsernameJson;
