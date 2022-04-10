const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/place-routes');
const usersRoutes = require('./routes/user-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    throw new HttpError("Couldn't find this route", 404);
})

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500).json({message: error.message || "An unknown error occured"})
});

mongoose
    .connect(`mongodb+srv://admin:admin123@cluster0.cufx8.mongodb.net/mern?retryWrites=true&w=majority`)
    .then(()=> {
        app.listen(5000);
    })
    .catch(error => {
        console.log(error)
    });


