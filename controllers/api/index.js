const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// TODO: To be implemented: 
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

// TODO
router.use('/comments', commentRoutes);

module.exports = router;
