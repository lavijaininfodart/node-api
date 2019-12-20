const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://testuser:testuser@cluster0-wc4xz.mongodb.net/test?retryWrites=true&w=majority');
//connect('mongodb+srv://testuser:'+process.env.password+'@cluster0-wc4xz.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connect('mongodb://admin:password@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false');


const productRoutes = require('./api/routes/products');

app.use(morgan('dev')); //used for loggin

app.use(bodyParser.urlencoded({
extended: false
})); //used for parsing url-encoded bodies

app.use(bodyParser.json()); //used for parsing json data in bodies

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*'); //Origin, X-Requested-With, Content-Type,Accept,Authorization

    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT','POST','GET','DELETE')
        return res.status(200).json({});
    }
    next();
});

app.use('/products',productRoutes);



app.use((req,res,next) => {
     const error = new Error('Not Found');
     error.status = '404';
     next(error);
})
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;
    
