const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');


function registerRoute(req, res, next){
  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ username: user.username, sub: user._id },
        secret, { expiresIn: '6h'});
      res.json({
        message: `Welcome ${user.username}!`,
        token,
        user
      });
    })
    .catch(next);
}


function loginRoute(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const token = jwt.sign({ username: user.username, sub: user._id }, secret, { expiresIn: '6h' });
      res.json({
        message: `Welcome back ${user.username}!`,
        token,
        user
      });
    })
    .catch(next);
}

module.exports = {
  registerRoute: registerRoute,
  loginRoute: loginRoute
};
