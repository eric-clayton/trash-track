const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { findUser, createUser } = require('./util');

function init() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/auth/google/callback',
        passReqToCallback: true,
      },
      async (_request, _accessToken, _refreshToken, profile, done) => {
        try {
          let user = await findUser(profile.id);

          if (!user) {
            console.log(await createUser(profile.id));
            user = await findUser(profile.id);
          }

          if (!user) {
            return done(null, false, { message: "User wasn't created for some reason?" });
          }

          return done(null, user);
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.googleID);
  });

  passport.deserializeUser(async (googleID, done) => {
    try {
      const user = await findUser(googleID);

      if (!user) {
        return done(null, false, { message: "User doesn't exist in database" });
      }

      return done(null, user);
    } catch (e) {
      return done(e);
    }
  });
}

exports.init = init;
