const axios = require("axios");
const HttpError = require("../models/http-error");

const G_API_KEY = 'NULL';

async function getCoordinatesFromAddress(address) {

    if(G_API_KEY !== 'NULL'){
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${G_API_KEY}`);

        const data = response.data;

        if(!data || data.status === "ZERO_RESULTS"){
            const error = new HttpError("Couldn't find location", 422);
            throw error;
        }
        
        const coordinates = data.results[0].geometry.location;

        return coordinates;
    }

    return {
        lat: 27.1751448,
        lng: 78.0399535
    }
}

module.exports = getCoordinatesFromAddress;