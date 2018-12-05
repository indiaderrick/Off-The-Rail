// const Purchase = require('../models/purchase');
//
// function indexRoute(req, res, next) {
//   Purchase.find()
//     .then(purchases => res.json(purchases))
//     .catch(next);
// }
//
// function createRoute(req, res, next) {
//   console.log('this is req.body', req.body);
//   if (Array.isArray(req.body)) {
//     // Add the current user to each element of the purchase array
//     req.body.forEach(purchase => {
//       purchase.user = req.currentUser._id;
//       purchase._id = null;
//     });
//   } else {
//     // There is only one item in the purchase. Add the current user to it.
//     req.body.user = req.currentUser._id;
//     req.body._id = null;
//   }
//   Purchase.create(req.body)
//     .then(purchase => res.json(purchase))
//     .catch(next);
// }
//
// function userIndexRoute(req, res, next) {
//   Purchase.find({ user: req.currentUser._id })
//     .populate('burger')
//     .then(purchases => res.json(purchases))
//     .catch(next);
// }
//
// module.exports = {
//   index: indexRoute,
//   createRoute: createRoute,
//   userIndexRoute: userIndexRoute
// };
