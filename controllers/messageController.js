const Message = require('../models/message');

function indexRoute(req, res, next){
  Message
    .find({ $or: [{ from: req.tokenUserId }, { to: req.tokenUserId}] })
    .populate('from to', 'username name profilePicture')
    .sort('createdAt')
    .then(messages => res.json(messages))
    .catch(next);
}

function createRoute(req, res, next){
  req.body.from = req.tokenUserId;
  Message.create(req.body)
    .then(message => Message.populate(message, 'from to'))
    .then(message => res.json(message))
    .catch(next);
}

function deleteRoute(req, res, next){
  Message
    .findById(req.params.id)
    .then(message => message.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}


module.exports = {
  indexRoute: indexRoute,
  createRoute: createRoute,
  deleteRoute: deleteRoute
};
