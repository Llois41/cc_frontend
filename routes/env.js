const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/env', (req, res) => {
    let { DEPOT_SERVICE, STOCK_SERVICE, NEWS_SERVICE } = process.env
    let env = { DEPOT_SERVICE, STOCK_SERVICE, NEWS_SERVICE }
    res.send(env)
});

module.exports = router;