import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LoginContext } from '../context/context';

import './header.scss';

const Header = (props) => {
    const auth = useContext(LoginContext);

    return (
        <header className="header">
            <h1 className="header-title"><Link to="/">People - Places</Link></h1>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" exact>All Users</NavLink>
                </li>
                {auth.isLoggedIn ?
                    <>
                        <li>
                            <NavLink to="/u1/places">My Places</NavLink>
                        </li>
                        <li>
                            <NavLink to="/places/new">Add Place</NavLink>
                        </li>
                        <li>
                            <button onClick={auth.logout}>Logout</button>
                        </li>
                    </>
                    :
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                }
            </ul>
        </header>
    )
}

export default Header;