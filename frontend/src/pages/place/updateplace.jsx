import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/input/input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validator';

import './place.scss';

const PLACES = [
    {
        id: 'p1',
        title: 'Taj Mahal',
        description: '17th-century, Mughal-style, marble mausoleum with minarets, a mosque & famously symmetrical gardens.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/550px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg',
        address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001',
        coordinates: {
            lat: 27.1751448,
            lng: 78.0399482
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Taj Mahal1',
        description: '17th-century, Mughal-style, marble mausoleum with minarets, a mosque & famously symmetrical gardens.',
        imageUrl: 'https://via.placeholder.com/150',
        address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001',
        coordinates: {
            lat: 27.1751448,
            lng: 78.0399482
        },
        creator: 'u2'
    },
];

const UpdatePlace = props =>{
    const placeId = useParams().placeId;

    const idPlace = PLACES.find(p => p.id === placeId);

    if(!idPlace){
        return(
            <h2>Couldn't find this place!</h2>
        )
    }
    return(
        <form className="place-form">
            <Input 
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={()=>{}}
                value={idPlace.title}
                valid={true}
            />
            <Input 
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter atleast 5 characters"
                onInput={()=>{}}
                value={idPlace.description}
                valid={true}
            />
            <button type="submit"  disabled={true}>Update Place</button>
        </form>
    )
}

export default UpdatePlace;