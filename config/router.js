const router = require('express').Router();
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
// const purchaseController = require('../controllers/purchaseController');
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

router.route('/users/:userId').get(userController.profileShow);
//
// router.post('/checkout', purchaseController.createRoute);
// router.get('/purchases', purchaseController.userIndexRoute);

module.exports = router;
