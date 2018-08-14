const router = require('express').Router();
const path = require('path');

router.all('*', function(request, response) {
  response.sendFile(path.resolve('dist/BicycleMarketPlace/index.html'));
});

module.exports = router;

