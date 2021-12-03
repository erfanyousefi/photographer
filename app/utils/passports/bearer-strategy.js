const passport = require("passport")
const BearerStrategy = require("passport-http-bearer").Strategy
const UserModel = require("./models/users")
passport.use(new BearerStrategy((token, done) => {
      UserModel.findOne({ token: token }, (err, user) => {
        if (err) { return done({status : 401, error : err, message : "دسترسی غیر مجاز لطفا وارد حساب کاربری خود شوید"}); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
));