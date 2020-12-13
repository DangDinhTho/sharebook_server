const express = require('express');
const actions = require('../methods/actions')
const productActions = require('../methods/product_actions')
const review = require('../methods/review_actions')

const multer = require('multer');
//const review = require('../models/review');

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

router.use('/uploads', express.static("uploads"));
router.post('/signup', actions.addNew);
router.post('/authenticate', actions.authenticate);
router.get('/getinfor', actions.getinfo)

router.post('/product/newBook', upload.single('image'), productActions.addNew);
router.get('/product/getAllBooks', productActions.getAllBook);
router.post('/product/withAuthor', productActions.getBookWithAuthor);
router.post('/product/withCategory', productActions.getBookWithCategory);

router.post('/post/addNew', upload.single('image'), review.addNew);
router.get('/post/getAllPosts', review.getAllPosts);
router.post('/post/getPost', review.getPost);
router.post('/post/like', review.likePost);
router.post('post/comment', review.commentPost);

module.exports = router;