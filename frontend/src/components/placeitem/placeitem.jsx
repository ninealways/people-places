import React from 'react';
import { Link } from 'react-router-dom';
import Map from '../../shared/map/map';
import Model from '../../shared/model/model';

import './placeitem.scss';

const PlaceItem = (props) => {
    const [showMap, setShowMap] = React.useState(false);

    const openModelClick = () => {
        setShowMap(true)
    }
    const closeModelClick = () => {
        setShowMap(false)
    }

    return (
        <>
            <Model showMap={showMap} onCancel={closeModelClick} header={props.address} contentClass="place-item-content" footerClass="place-item-actions" footer={<span className="btn btn-red" onClick={closeModelClick}>Close</span>}>
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Model>
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
                        <button className="btn btn-blue" onClick={openModelClick}>View on Map</button>
                        <Link className="btn btn-green" to={`/places/${props.id}`}>Edit</Link>
                        <button className="btn btn-red">Delete</button>
                    </div>
                </div>
            </li>
        </>
    )
}

export default PlaceItem;