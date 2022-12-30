const { Router } = require('express');
const controllers = require('../controllers/comments');
const authControllers = require('../controllers/auth')
const commentValidation = require('../validation/validation');
const router = Router();

router.get('/comments', controllers.getAllComments);
router.get('/comments/:id', controllers.getCommentById);
router.post('/comments/', commentValidation.commentValidationRules, commentValidation.checkErrors, authControllers.authenticateToken, controllers.createComment);
router.put('/comments/:id', commentValidation.commentValidationRules, commentValidation.checkErrors, authControllers.authenticateToken, controllers.updateComment);
router.delete('/comments/:id', authControllers.authenticateToken, controllers.deleteComment);
module.exports = router;