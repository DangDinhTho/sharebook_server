var Product = require('../models/product')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const user = require('../models/user')
const product = require('../models/product')
const { use } = require('../routers')
const { Double } = require('mongodb')


var functions = {

addNew: function (req, res) {
    
    //console.log(req.file);
    
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1]
        var decodedtoken = jwt.decode(token, config.secret)

        if ((!req.body.title) || (!req.body.subtitle)) {
            res.json({success: false, msg: 'Enter all fields'})
        }
        else {
          var newProduct = Product({
            title: req.body.title,
            subtitle: req.body.subtitle,
            price: Number(req.body.price),
            author: req.body.author,
            publisher: req.body.publisher,
            year: req.body.year,
            category: req.body.category,
            owner: decodedtoken.name,
            imageURLs: [req.file.path],
            address: decodedtoken.address
        });
            
            newProduct.save(function (err, newProduct) {
                if (err) {
                    res.json({success: false, msg: 'Failed to save'})
                }
                else {
                    //return res.json({success: true, msg: 'Successfully saved'});
                    user.updateOne({name: decodedtoken.name}, {$push: {library: newProduct._id}}, (err, data) => {
                        if(err) throw err;
                        else return res.json({newBook: newProduct, success: true});
                    });
                }
            })
        }
       
    }
    else {
        return res.json({success: false, msg: 'No Headers'})
    }



    
},

getAllBook: function(req, res){
    product.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
},

getBookWithAuthor: function(req, res){
    product.find({author: req.body.author}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
},

getBookWithCategory: function(req, res){
    product.find({category: req.body.category}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
},

getBookWithAuthor: function(req, res){
    product.find({owner: req.body.owner}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
}

}

module.exports = functions;