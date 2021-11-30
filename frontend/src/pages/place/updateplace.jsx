import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from '../../shared/hooks/form-hook';
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

const UpdatePlace = props => {
    const [isLoading, setIsLoading] = useState(true);

    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false,
        },
        description: {
            value: '',
            isValid: false,
        }
    }, true);

    const idPlace = PLACES.find(p => p.id === placeId);

    useEffect(() => {
        if (idPlace) {
            setFormData({
                title: {
                    value: idPlace.title,
                    isValid: true,
                },
                description: {
                    value: idPlace.description,
                    isValid: true,
                }
            }, true);
        }
        setIsLoading(false);
    }, [setFormData, idPlace]);

    const placeUpdateSubmit = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if(!idPlace) {
        return(
            <div className="userlist center">
                <h2 className="no-users">No places found!</h2>
                <div className="w-100 center">
                    <Link to="/places/new" className="btn btn-green">Share Place</Link>
                </div>
            </div>
        )
    }
    if (isLoading) {
        return (
            <h2>Loading!</h2>
        )
    }
    return (
        <form className="place-form" onSubmit={placeUpdateSubmit} >
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter atleast 5 characters"
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <button className="btn btn-green" type="submit" disabled={!formState.isValid}>Update Place</button>
        </form>
    )
}

export default UpdatePlace;