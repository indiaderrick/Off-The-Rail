const User = require('../models/user');

function profileShow(req, res, next) {
  console.log('this is req.params', req.params)
  User
    .findById(req.params.userId)
    .populate('addedItems')
    .then(user => {
      res.json(user);
    })
    .catch(next);
}


module.exports = {
  profileShow: profileShow
};
