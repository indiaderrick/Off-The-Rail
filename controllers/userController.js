const User = require('../models/user');

function profileShow(req, res, next) {
  console.log('this is req.params', req.params);
  User
    .findById(req.params.userId)
    .populate('addedItems peopleYouFollow thingsILike')
    .then(user => {
      res.json(user);
    })
    .catch(next);
}

// function editUser(req, res, next){
//   User
//     .findById(req.params.userId)
//     .exec()
//     .then(user => {
//       Object.assign(user, req.body);
//       return user.save();
//     })
//     .then(user => res.json(user))
//     .catch(next);
// }

function followRoute(req, res, next) {
  console.log('this is req.currentUserId', req.currentUser._id);
  User
    .findById(req.params.userId)
    .then(user => {
      if(!user.followers.find(userId => userId === req.currentUser._id)){
        user.followers.push(req.currentUser._id);
        return user.save();
      } else {
        res.status(442).json({ message: 'Cant follow twice'});
        next();
      }
    })
    .then(user => res.json(user))
    .catch(next);
}

function unfollowRoute(req, res, next) {
  console.log('you got to the unbookmark function');
  User
    .findById(req.params.userId)
    .then(user => {
      console.log('this is the user then currentUser', user, req.currentUser._id);
      if(!user.followers.find( userId => userId.toString() === req.currentUser._id.toString())){
        res.status(422).json({ message: 'Havent followed yet'});
      } else {
        console.log('unfollow');
        user.followers = user.followers.filter(x => x.toString() !== req.currentUser._id.toString());
        return user.save();
      }
    })
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  profileShow: profileShow,
  followRoute: followRoute,
  unfollowRoute: unfollowRoute
  // editUser: editUser
};
