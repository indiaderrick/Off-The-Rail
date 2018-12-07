const Item = require('../models/item');

function indexRoute(req, res, next){
  Item
    .find()
    .exec()
    .then(items => res.json(items))
    .catch(next);
}

function showRoute(req, res, next){
  Item
    .findById(req.params.id)
    .populate('addedBy')
    .exec()
    .then(item => res.json(item))
    .catch(next);
}

function createRoute(req, res, next){
  console.log('this is what we sent the server:', req.body);
  req.body.addedBy = req.currentUser._id;
  Item
    .create(req.body)
    .then(item => res.status(201).json(item))
    .catch(next);
}

function updateRoute(req, res, next){
  Item
    .findById(req.params.id)
    .exec()
    .then(item => {
      Object.assign(item, req.body);
      return item.save();
    })
    .then(item => res.json(item))
    .catch(next);
}

function deleteRoute(req, res, next){
  Item
    .findById(req.params.id)
    .exec()
    .then(item => item.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}
module.exports ={
  indexRoute: indexRoute,
  showRoute: showRoute,
  createRoute: createRoute,
  updateRoute: updateRoute,
  deleteRoute: deleteRoute

};
