var Product = require('../models/product')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const user = require('../models/user')


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
                price: req.body.price,
                author: req.body.author,
                publisher: req.body.publisher,
                category: req.body.category,
                owner: decodedtoken.name,
                imageURLs: [req.file.path]
            });
            newProduct.save(function (err, newProduct) {
                if (err) {
                    res.json({success: false, msg: 'Failed to save'})
                }
                else {
                    //return res.json({success: true, msg: 'Successfully saved'});
                    user.updateOne({name: decodedtoken.name}, {$push: {library: newProduct._id}}, (err, data) => {
                        if(err) throw err;
                        else return res.json({success: true, msg: 'Successfully saved'});
                    });
                }
            })
        }
       
    }
    else {
        return res.json({success: false, msg: 'No Headers'})
    }



    
},
}

module.exports = functions;