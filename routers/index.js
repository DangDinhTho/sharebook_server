const express = require('express');
const actions = require('../methods/actions')
const productActions = require('../methods/product_actions')

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, "H" + Date.now() + file.originalname);
    }
});

var upload = multer({storage: storage});

const router = express.Router();

router.get('/', (req, res) => {
   res.send('Hello');
});

router.post('/signup', actions.addNew);
router.post('/authenticate', actions.authenticate);
router.get('/getinfor', actions.getinfo)
router.post('/newProduct', upload.single('file'), productActions.addNew);

module.exports = router;