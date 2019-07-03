var router = require('express').Router();
var patientController = require('../../controller/v1/patientController');
var JWT = require('../../auth/jwt')

router.route('/authenticate')
  .post(patientController.authenticate, JWT.generate);

router.route('/register')
  .post(patientController.register, JWT.generate);

router.route('/:id')
  .get(patientController.view)
  .patch(patientController.update)
  .put(patientController.update)
  .delete(patientController.delete);

module.exports = router;