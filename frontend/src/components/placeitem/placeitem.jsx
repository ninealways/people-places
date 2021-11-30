import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../shared/context/context';
import Map from '../../shared/map/map';
import Model from '../../shared/model/model';

import './placeitem.scss';

const PlaceItem = (props) => {
    const auth = useContext(LoginContext);

    const [showMap, setShowMap] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const openModelClick = () => {
        setShowMap(true)
    }
    const closeModelClick = () => {
        setShowMap(false)
    }

    const showDeleteModel = () => {
        setShowConfirm(true)
    }

    const cancelDeleteModel = () => {
        setShowConfirm(false)
    }

    const confirmDeleteHandler = () => {
        setShowConfirm(false)
        console.log('Deleted');
    }

    return (
        <>
            <Model
                showMap={showMap}
                onCancel={closeModelClick}
                header={props.address}
                contentClass="place-item-content"
                footerClass="place-item-actions"
                footer={<span className="btn btn-red"
                    onClick={closeModelClick}>Close</span>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Model>
            <Model
                showMap={showConfirm}
                header="Are you sure?"
                footerClass="place-item-actions"
                footer={<><span className="btn btn-blue"
                    onClick={cancelDeleteModel}>Cancel</span><span className="btn btn-red"
                        onClick={confirmDeleteHandler}>Delete</span></>}
            >
                <h3 className="center">Do you wish to delete this place?</h3>
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
                        {auth.isLoggedIn ?
                            <>
                                <Link className="btn btn-green" to={`/places/${props.id}`}>Edit</Link>
                                <button className="btn btn-red" onClick={showDeleteModel}>Delete</button>
                            </> :
                            ''
                        }
                    </div>
                </div>
            </li>
        </>
    )
}

export default PlaceItem;