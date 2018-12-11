const router = require('express').Router();
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const purchaseController = require('../controllers/purchaseController');
const messageController = require('../controllers/messageController');
const saveForLaterController = require('../controllers/saveForLaterController');
const secureRoute = require('../lib/secureRoute');

router.route('/items')
  .get(itemController.indexRoute)
  .post(secureRoute, itemController.createRoute);

router.route('/items/:id')
  .get(itemController.showRoute)
  .put(secureRoute, itemController.updateRoute)
  .delete(secureRoute, itemController.deleteRoute);

router.route('/register').post(authController.registerRoute);
router.route('/login').post(authController.loginRoute);

router.route('/users/:userId')
  .get(userController.profileShow);
  // .put(userController.editUser);


router.route('/checkout').post(secureRoute, purchaseController.createRoute);
router.route('/purchases').get(secureRoute, purchaseController.userIndexRoute);

router.route('/messages')
  .get(secureRoute, messageController.indexRoute)
  .post(secureRoute, messageController.createRoute);

router.route('/items/:itemId/saveForLater')
  .post(secureRoute, saveForLaterController.saveRoute)
  .delete(secureRoute, saveForLaterController.deleteRoute);

router.route('/users/:userId/follow')
  .post(secureRoute, userController.followRoute)
  .delete(secureRoute, userController.unfollowRoute);

router.route('/messages/:id').delete(secureRoute, messageController.deleteRoute);

module.exports = router;
