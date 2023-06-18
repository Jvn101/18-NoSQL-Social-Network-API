const router = require('express').Router();

const userRoutes = require('./userRoute');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);



module.exports = router;
