const authRouter = require('./auth.routes');
const bikeRoutes = require('./bike.routes');
const router = require('express').Router();

module.exports = router.use('/auth', authRouter).use('/bikes', bikeRoutes);

