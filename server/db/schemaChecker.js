const { Coord } = require('./schema/Coord');
const { User } = require('./schema/User');

function isSchema(obj, refObj) {
  if (typeof obj !== typeof Object() || typeof refObj !== typeof Object()) {
    return false;
  }

  if (Object.keys(obj).length !== Object.keys(refObj).length) {
    return false;
  }

  const keys = Object.keys(refObj);
  let is = true;

  keys.forEach((key) => {
    if (!obj.hasOwnProperty(key)) {
      is = false;
    }

    if (typeof obj[key] !== typeof refObj[key]) {
      is = false;
    }
  });

  return is;
}

/* Public Methods */

function isCoord(coord) {
  const coordTemplate = new Coord();
  return isSchema(coord, coordTemplate);
}

function isUser(user) {
  const userTemplate = new User();
  return isSchema(user, userTemplate);
}

exports.isCoord = isCoord;
exports.isUser = isUser;
