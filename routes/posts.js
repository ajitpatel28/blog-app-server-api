const { Router } = require('express');
const controllers = require('../controllers/posts');
const authControllers = require('../controllers/auth')
const postValidation = require('../validation/validation')
const router = Router();

router.get('/posts', controllers.getAllPosts);
router.get('/posts/:id', controllers.getPostById);
router.post('/posts/', postValidation.postValidationRules, postValidation.checkErrors, authControllers.authenticateToken, controllers.createPost);
router.put('/posts/:id', postValidation.postValidationRules, postValidation.checkErrors, authControllers.authenticateToken, controllers.updatePost);
router.delete('/posts/:id', authControllers.authenticateToken, controllers.deletePost);
module.exports = router;