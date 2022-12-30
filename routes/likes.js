const { Router } = require('express');
const controllers = require('../controllers/likes');
const router = Router();

router.get('/likes', controllers.getAllLikes);
router.post('/likes/', controllers.createLike);
router.put('/likes/:id', controllers.updateLike);
router.delete('/likes/:id', controllers.deleteLike);
module.exports = router;
