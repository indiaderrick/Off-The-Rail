const Purchase = require('../models/purchase');

function indexRoute(req, res, next){
  Purchase
    .find()
    .then(purchases => res.json(purchases))
    .catch(next);
}

function createRoute(req, res, next){
  if(Array.isArray(req.body)){
    req.body.forEach(purchase => {
      purchase.user = req.currentUser._id;
      purchase._id = null;
    });
  } else {
    req.body.user = req.currentUser._id;
    req.body._id = null;
  }
  Purchase.create(req.body)
    .then(purchase => res.json(purchase))
    .catch(next);
}

function userIndexRoute(req, res, next){
  Purchase
    .find({ user: req.currentUser._id })
    .populate('item')
    .then(purchases => res.json(purchases))
    .catch(next);
}

module.exports = {
  indexRoute: indexRoute,
  createRoute: createRoute,
  userIndexRoute: userIndexRoute
};
