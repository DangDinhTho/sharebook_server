const express = require('express');
const actions = require('../methods/actions')

const router = express.Router();

router.get('/', (req, res) => {
   res.send('Hello');
});

router.post('/addUser', actions.addNew);
router.post('/authenticate', actions.authenticate);
router.get('/getinfor', actions.getinfo)

module.exports = router;