const coordDistance = (coordObj1, coordObj2) => {
  return Math.sqrt(
    Math.pow(coordObj2.lat - coordObj1.lat, 2) + Math.pow(coordObj2.lng - coordObj1.lng, 2)
  );
};

const coordClosest = (coordArray, coordObj) => {
  let closeCoord = null;
  let closeDist = Infinity;

  coordArray.forEach(coord => {
    const tempDist = coordDistance(coord, coordObj);

    if (tempDist < closeDist) {
      closeCoord = coord;
      closeDist = tempDist;
    }
  });

  return {coordinates: closeCoord, distance: closeDist};
}

exports.coordDistance = coordDistance;
exports.coordClosest = coordClosest;
