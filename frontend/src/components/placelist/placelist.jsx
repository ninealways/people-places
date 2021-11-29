import React from 'react';
import PlaceItem from '../placeitem/placeitem';

import './placelist.scss';

const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="userlist center">
                <h2 className="no-users">No places found!</h2>
                <div className="w-100 center"><button className="btn btn-green">Share Place</button></div>
            </div>
        )
    }

    return (
        <ul className="place-list">
            {
                props.items.map(place => {
                    return (
                        <PlaceItem
                            key={place.id}
                            id={place.id}
                            image={place.imageUrl}
                            title={place.title}
                            description={place.description}
                            address={place.address}
                            creatorId={place.creator}
                            coordinates={place.coordinates}
                        />
                    )
                })
            }
        </ul>
    )
}

export default PlaceList;