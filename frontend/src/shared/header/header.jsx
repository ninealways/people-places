import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './header.scss';

const Header = (props) => {
    return(
        <header className="header">
            <h1 className="header-title"><Link to="/">People - Places</Link></h1>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" exact>All Users</NavLink>
                </li>
                <li>
                    <NavLink to="/u1/places">My Places</NavLink>
                </li>
                <li>
                    <NavLink to="/places/new">Add Place</NavLink>
                </li>
                <li>
                    <NavLink to="/auth">Auth</NavLink>
                </li>
            </ul>
        </header>
    )
}

export default Header;