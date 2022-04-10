const HttpError = require('../models/http-error');

const { validationResult } = require("express-validator");
const User = require('../models/user');

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (error) {
        return next(new HttpError('Fetching users failed. Please try again later', 500));
    }

    res.json({users: users.map(user => user.toObject({getters: true}))})
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new HttpError("Invalid Inputs, Please check your data", 422);
        return next(error);
    }

    const {name, email, password} = req.body;

    let existingUser;
    try {    
        existingUser = await User.findOne({email: email});
    } catch (err) {
        const error = new HttpError('Signing up failed, please try agian later.', 500)
        return next(error);
    }

    if(existingUser) {
        const error = new HttpError("Couldn't create user. Email already exists", 422);
        return next(error);
    }

    const  createdUser = new User({
        name,
        email,
        image: 'https://via.placeholder.com/150',
        password,
        places: []
    });

    try{
        await createdUser.save();
    }catch{
        return next(new HttpError('Signing up failed failed, please try again later'), 500);
    }

    res.status(201).json({user: createdUser.toObject({getters: true})})
}

const login = async (req, res, next) => {
    const {email, password} = req.body;

    let existingUser;
    try {    
        existingUser = await User.findOne({email: email});
    } catch (err) {
        const error = new HttpError('Logging in failed, please try agian later.', 500)
        return next(error);
    }

    if(!existingUser || existingUser.password !== password){
        return next(new HttpError("Could'nt login. Please enter correct details.", 401));
    }

    res.json({message: 'Logged in!'});
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;