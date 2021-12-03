const passport = require("passport")
const BearerStrategy = require("passport-http-bearer");
const UserModel = require("../../models/users");
exports.BearerAuthenticated = function(req, res, next){
    passport.use(new BearerStrategy(
        function(token, done) {
          UserModel.findOne({ token: token }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
          });
        }
    ));
    passport.authenticate('bearer', {session: false}, function(err, user, info) {
        if (err) { return next(err); }
        //authentication error
        if (!user) { 
            return res.status(401).json({
                status : 401,
                success : false,
                error: info.message || 'توکن نا معتبر',
                message : "دسترسی غیر مجاز"
            }) 
        }else{
          req.user = user;
          return next();
        }

    })(req, res, next)
}