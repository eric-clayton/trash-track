class Bin {
  constructor(lat = 0, lng = 0, isRecycle = false, username = '') {
    this.lat = lat;
    this.lng = lng;
    this.isRecycle = isRecycle;
    this.username = username;
  }

  static testBin() {
    return new Bin();
  }
}

exports.Bin = Bin;
