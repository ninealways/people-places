const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

const { validationResult } = require("express-validator");
const getCoordinatesFromAddress = require('../utils/location');

let PLACES = [{
    id: 'p1',
    title: 'Taj Mahal',
    description: '17th-century, Mughal-style, marble mausoleum with minarets, a mosque & famously symmetrical gardens.',
    location:{
        lat: 27.1751448,
        lng: 78.0399535
    },
    address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001',
    creator: 'u1'
}];

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    const place = PLACES.find(p => p.id === placeId);

    if(!place){
        return next(new HttpError("Counldn't find any place for the provided Id", 404));   
    }

    let coordinates;
    try {
        coordinates = await getCoordinatesFromAddress(place.address)
    } catch (error) {
        return next(error);
    }

    res.json({place})
};

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = PLACES.filter(p => p.creator === userId);

    if(!places || places.length === 0){
        return next(new HttpError("Counldn't find any places for the provided User Id", 404));
    }

    res.json({places})
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors)
        return next(new HttpError("Invalid Inputs, Please check your data", 422));
    }
    const {title, description, address, creator} = req.body;

    let coordinates;
    try {
        coordinates = await getCoordinatesFromAddress(address)
    } catch (error) {
        return next(error);
    }

    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }

    PLACES.push(createdPlace);

    res.status(201).json({place: createdPlace});
}

const updatePlaceById = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors)
        throw new HttpError("Invalid Title and Description", 422);
    }

    const {title, description} = req.body;
    const placeId = req.params.pid;

    const updatedPlace = {...PLACES.find(p => p.id === placeId)};

    const placeIndex = PLACES.findIndex(p => p.id === placeId);

    updatedPlace.title = title;
    updatedPlace.description = description;

    PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});

}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;

    if(!PLACES.find(p => p.id === placeId)){
        throw new HttpError("Couldn't find a place with this ID to delete", 404);
    }

    PLACES = PLACES.filter(p => p.id !== placeId);

    res.status(200).json({message: 'Place Deleted'})
}
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;