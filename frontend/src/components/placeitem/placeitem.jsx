import React from 'react';
import { Link } from 'react-router-dom';

import './placeitem.scss';

const PlaceItem = (props) => {
    return (
        <li className="place-item">
            <div className="place-item-img">
                <img src={props.image} alt={props.title} />
            </div>
            <div className="place-details">
                <div className="place-info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{PlaceItem.description}</p>
                </div>
                <div className="place-actions">
                    <button className="btn btn-blue">View on Map</button>
                    <Link className="btn btn-green" to={`/places/${props.id}`}>Edit</Link>
                    <button className="btn btn-red">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default PlaceItem;