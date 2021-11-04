class Coord {
  constructor(lat = 0, lng = 0) {
    this.lat = lat;
    this.lng = lng;
  }

  static testCoord() {
    return new Coord(0, 0);
  }
}

exports.Coord = Coord;
