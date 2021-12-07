const HttpError = require('../models/http-error');

const PLACES = [{
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

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = PLACES.find(p => p.id === placeId);

    if(!place){
        return next(new HttpError("Counldn't find any place for the provided Id", 404));   
    }

    res.json({place})
};

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = PLACES.find(p => p.creator === userId);

    if(!place){
        return next(new HttpError("Counldn't find any place for the provided User Id", 404));
    }

    res.json({place})
};

const createPlace = (req, res, next) => {
    const {title, description, coordinates, address, creator} = req.body;
    const createdPlace = {
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

}
exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;