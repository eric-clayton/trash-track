class User {
  constructor(
    googleID = '',
    username = '',
    bio = '',
    pfpURL = '',
    // year, month, day, hour, minute
    timeLastAdded = new Date(2002, 6, 5, 12, 30),
    trashLocs = [],
    recycleLocs = [],
    friends = [],
    xp = 0
  ) {
    this.googleID = googleID;
    this.username = username;
    this.bio = bio;
    this.pfpURL = pfpURL;
    this.timeLastAdded = timeLastAdded;
    this.trashLocs = trashLocs;
    this.recycleLocs = recycleLocs;
    this.friends = friends;
    this.xp = xp;
  }

  static testUser() {
    return new User(
      '123456789012345678901',
      'testUser',
      'test bio...',
      'www.someurl.com',
      new Date(),
      [{ lat: 0, lng: 0 }],
      [{ lat: 0, lng: 0 }],
      ['testFriendOne, testFriendTwo'],
      999
    );
  }
}

exports.User = User;
