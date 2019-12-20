const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const Product =  require('../../models/product');

route.get('/', (req,res,next)=> {
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        if(docs.length > 0){
            res.status(200).json(docs);
        }else {
            res.status(404).json({
                message: "No Entries were found!"
            })
        }
        
    })
    
    res.status(200).json({
        message: 'Get Request to Products',
    });
});


route.get('/:id', (req,res,next)=> {
    
    Product.findById(req.params.id)
    .exec().then( doc => {
        console.log("From Database ".doc);
        if(doc) {
            res.status(200).json(doc)
        }else{
            res.status(404).json({
                message: 'No Value found'
            });
        }
    })
    // res.status(200).json({
    //     message: 'You want data for specific product',
    //     id: req.params.id
    // });
});
route.post('/', (req,res,next)=> {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,

    });
    product.save().then( result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(200).json({
        message: 'Get Request to Products',
        data: product
    });
});

module.exports = route;