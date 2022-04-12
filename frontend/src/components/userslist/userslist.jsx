import React from 'react';
import UserItem from '../useritem/useritem';
import './userslist.scss';

const UsersList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="userlist center">
                <h2 className="no-users">No users found!</h2>
            </div>
        )
    }

    return (
        <ul className="userlist">
            {
                props.items.map(user => {
                    return <UserItem key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.places.length} />
                })
            }
        </ul>
    )
}

export default UsersList;