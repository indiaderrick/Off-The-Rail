const User = require('../models/user');

function profileShow(req, res, next) {
  User
    .findById(req.params.userId)
    .populate('addedPosts')
    .then(user => {
      res.json(user);
    })
    .catch(next);
}


module.exports = {
  profileShow: profileShow
};
