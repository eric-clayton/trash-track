class Coord {
  constructor(lat = 0, lng = 0) {
    this.lat = lat;
    this.lng = lng;
  }

  static testCoord() {
    return new Coord();
  }
}

exports.Coord = Coord;
