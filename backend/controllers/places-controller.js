const HttpError = require('../models/http-error');
const mongoose = require("mongoose");

const { validationResult } = require("express-validator");
const getCoordinatesFromAddress = require('../utils/location');
const Place = require('../models/place');
const User = require('../models/user');

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);   
    } catch (err) {
        const error = new HttpError("Something went wrong. Coundn't find any place!", 500);
        return next(error);
    }

    if(!place){
        return next(new HttpError("Counldn't find any place for the provided Id", 404));   
    }

    res.json({place: place.toObject({getters: true})});
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let places;
    try {
        places = await Place.find({creator: userId});
    } catch (err) {
        const error = new HttpError("Something went wrong. Coundn't find any place!", 500);
        return next(error);
    }

    if(!places || places.length === 0){
        return next(new HttpError("Counldn't find any places for the provided User Id", 404));
    }

    res.json({places: places.map(place => place.toObject({getters: true}))});
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError("Invalid Inputs, Please check your data", 422));
    }
    const {title, description, address, creator} = req.body;

    let coordinates;
    try {
        coordinates = await getCoordinatesFromAddress(address)
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://via.placeholder.com/150',
        creator
    });

    let user;
    try{
        user = await User.findById(creator);
    }catch{
        return next(new HttpError('Creating Place failed, please try again'), 500);
    }

    if(!user){
        return next(new HttpError("Coundn't find user for the provided ID", 404));
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({session: sess});
        user.places.push(createdPlace);
        await user.save({session: sess});
        await sess.commitTransaction();
    }catch{
        return next(new HttpError('Creating Place failed, please try again'), 500);
    }

    res.status(201).json({place: createdPlace});
}

const updatePlaceById = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new HttpError("Invalid Title and Description", 422));
    }

    const {title, description} = req.body;
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (error) {
        return next(new HttpError("Invalid Title and Description", 422));
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (error) {
        return next(new HttpError("Something went wrong. Coundn't update the place", 500));
    }
    res.status(200).json({place: place.toObject({getters: true})});

}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (error) {
        return next(new HttpError("Couldn't find a place with this ID to delete", 500));
    }

    if(!place){
        return next(new HttpError("Couldn't find any place to delete", 404));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({session: sess});
        place.creator.places.pull(place);
        await place.creator.save({session: sess});
        await sess.commitTransaction();   
    } catch (error) {
        return next(new HttpError("Couldn't remove the place with this ID", 500));
    }
    res.status(200).json({message: 'Place Deleted'})
}
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;