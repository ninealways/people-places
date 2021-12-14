const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

const { validationResult } = require("express-validator");

const USERS = [{
    id: 'u1',
    name: 'navnit',
    email: 'navnit@exp.com',
    password: 'test'
}]
const getUsers = (req, res, next) => {
    res.json({users: USERS})
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError("Invalid Inputs, Please check your data", 422);
    }

    const {name, email, password} = req.body;

    const existingUser = USERS.find(u => u.email === email);

    if(existingUser) {
        throw new HttpError("Couldn't create user. Email already exists", 422);
    }

    const  createUser = {
        id: uuidv4(),
        name,
        email,
        password
    }

    USERS.push(createUser);

    res.status(201).json({user: createUser})
}

const login = (req, res, next) => {
    const {email, password} = req.body;

    const currUser = USERS.find(u => u.email === email);

    if(!currUser || currUser.password !== password){
        throw new HttpError("Could'nt login with this email and password. Please enter correct details.", 401)
    }

    res.json({message: 'Logged in!'});
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;