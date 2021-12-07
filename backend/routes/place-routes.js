const express = require('express');
const { getPlaceById, getPlaceByUserId, createPlace, updatePlaceById, deletePlace } = require('../controllers/places-controller');

const router = express.Router();

router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlaceByUserId);

router.post('/', createPlace);

router.patch('/:pid', updatePlaceById);

router.delete('/', deletePlace);

module.exports = router;