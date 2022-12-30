const { Router } = require('express');
const controllers = require('../controllers/users');
const userValidation = require('../validation/validation');
const authControllers = require('../controllers/auth');
const router = Router();

router.get('/users', controllers.getAllUsers);
router.get('/users/:id', controllers.getUserById);
router.post('/users/', userValidation.userValidationRules, userValidation.checkErrors, controllers.createUser);
router.put('/users/:id', userValidation.userValidationRules, userValidation.checkErrors, authControllers.authenticateToken, controllers.updateUser);
router.delete('/users/:id', authControllers.authenticateToken, controllers.deleteUser);
router.post('/users/login', userValidation.loginValidationRules, userValidation.checkErrors, authControllers.loginUser);
router.get('/auth/verify', authControllers.verifyTokenUser);

module.exports = router;