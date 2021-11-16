const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/list', apiRoutes);

module.exports = router;