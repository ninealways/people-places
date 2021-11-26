import React from 'react';
import { Link } from 'react-router-dom';
import './useritem.scss';

const UserItem = (props) => {
    return (
        <li className="user-item">
            <Link to={`/${props.id}/places`}>
                <div className="user-content">
                    <div className="user-image">
                        <img src={props.image} alt={props.name} />
                    </div>
                    <div className="user-info">
                        <h2>{props.name}</h2>
                        <h3>{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}</h3>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default UserItem;