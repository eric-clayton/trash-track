class User {
  constructor(
    googleID = '',
    username = '',
    bio = '',
    pfpURL = '',
    trashLocs = [],
    recycleLocs = [],
    friends = [],
    xp = 0
  ) {
    this.googleID = googleID;
    this.username = username;
    this.bio = bio;
    this.pfpURL = pfpURL;
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
      [{ lat: 0, lng: 0 }],
      [{ lat: 0, lng: 0 }],
      ['testFriendOne, testFriendTwo'],
      999
    );
  }
}

exports.User = User;
