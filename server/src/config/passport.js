const { authSecret } = require('../../.env');
const passport = require('passport');
const db = require('../config/db');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;

module.exports = () => {
    
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        db('usernames')
        .where({ id: payload.id })
        .first()
        .then(user => {
            if (user) {
                done(null, { id: user.id, email: user.email })
            } else {
                done(null, false)
            }
        })
        .catch(err => done(err, false))
    })
    
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('jwt', { session: false });
        }
    
    }
}