import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../../components/placelist/placelist';

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

const UserPlaces = () => {
    const userId = useParams().userId;
    const filteredPlaces = PLACES.filter(place => place.creator === userId);

    return (
        <PlaceList items={filteredPlaces} />
    )
}

export default UserPlaces;