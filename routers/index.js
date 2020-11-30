const express = require('express');
const actions = require('../methods/actions')
const productActions = require('../methods/product_actions')

const router = express.Router();

router.get('/', (req, res) => {
   res.send('Hello');
});

router.post('/signup', actions.addNew);
router.post('/authenticate', actions.authenticate);
router.get('/getinfor', actions.getinfo)
router.post('/newProduct', productActions.addNew);

module.exports = router;