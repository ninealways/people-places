import React from 'react';
import UsersList from '../../components/userslist/userslist';

import './users.scss';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Navnit',
            image: 'https://via.placeholder.com/150',
            places: 3
        },
        {
            id: 'u2',
            name: 'Singh',
            image: 'https://via.placeholder.com/150',
            places: 1
        }
    ];
    return(
        <UsersList items={USERS} />
    )
}

export default Users;