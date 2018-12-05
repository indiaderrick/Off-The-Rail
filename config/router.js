const router = require('express').Router();
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.route('/items')
  .get(itemController.indexRoute)
  .post(itemController.createRoute);

router.route('/items/:id')
  .get(itemController.showRoute)
  .put(itemController.updateRoute)
  .delete(itemController.deleteRoute);

router.route('/register').post(authController.registerRoute);
router.route('/login').post(authController.loginRoute);

router.route('/users/:userId').get(userController.profileShow);

module.exports = router;
