const mongo = require('./db/db');
const { User } = require('./db/schema/User');

const degToMeterFactor = 111139;

const coordDistance = (coordObj1, coordObj2) => {
  return Math.sqrt((coordObj2.lat - coordObj1.lat) ** 2 + (coordObj2.lng - coordObj1.lng) ** 2);
};

const coordClosest = async (coordObj) => {
  let closeCoord = null;
  let closeDist = Infinity;

  const db = mongo.get();

  await db
    .collection('coordinates')
    .find()
    .forEach((coord) => {
      const tempDist = coordDistance(coord, coordObj);

      if (tempDist < closeDist) {
        closeCoord = { lat: coord.lat, lng: coord.lng };
        closeDist = tempDist;
      }
    });

  if (closeCoord == null) {
    return { coordinates: { lat: 0, lng: 0 }, distance: 0 };
  }

  return { coordinates: closeCoord, distance: closeDist };
};

const canAddCoord = async (coordObj, distance) => {
  const db = mongo.get();
  let canAdd = true;

  await db
    .collection('coordinates')
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
    next();
  } else {
    res.redirect('/login');
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
