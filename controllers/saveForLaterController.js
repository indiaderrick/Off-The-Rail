const Item = require('../models/item');

function saveRoute(req, res, next) {
  Item
    .findById(req.params.itemId)
    .then(item => {
      if(!item.savedForLater.find(userId => userId.toString() === req.currentUser._id.toString())){
        item.savedForLater.push(req.currentUser._id);
        return item.save();
      } else {
        res.status(442).json({ message: 'Cannot like twice silly!'});
        next();
      }
    })
    .then(item => res.json(item))
    .catch(next);
}

function deleteRoute(req, res, next) {
  console.log('you got to the save function');
  Item
    .findById(req.params.itemId)
    .populate('item')
    .then(item => {
      console.log('item', item, req.currentUser._id);
      if(!item.savedForLater.find( userId => userId.toString() === req.currentUser._id.toString())){
        res.status(422).json({ message: 'You havent savedForLater'});
      } else {
        console.log('unsaved');
        item.savedForLater = item.savedForLater.filter(x => x.toString() !== req.currentUser._id.toString());
        return item.save();
      }
    })
    .then(item => res.json(item))
    .catch(next);
}

module.exports = {
  saveRoute: saveRoute,
  deleteRoute: deleteRoute
};
