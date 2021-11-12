class User {
  constructor(
    googleID = '',
    username = '',
    bio = '',
    pfpURL = '',
    // year, month, day, hour, minute
    timeLastAdded = new Date(2002, 6, 5, 12, 30),
    trashCount = 0,
    recycleCount = 0,
    friends = [],
    xp = 0
  ) {
    this.googleID = googleID;
    this.username = username;
    this.bio = bio;
    this.pfpURL = pfpURL;
    this.timeLastAdded = timeLastAdded;
    this.trashCount = trashCount;
    this.recycleCount = recycleCount;
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
      0,
      0,
      ['testFriendOne, testFriendTwo'],
      999
    );
  }
}

exports.User = User;
