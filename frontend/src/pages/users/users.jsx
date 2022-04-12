import React, { useEffect, useState } from 'react';
import UsersList from '../../components/userslist/userslist';
import Loader from '../../shared/loader/loader';

import './users.scss';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    useEffect(()=>{
        const sendRequest = async ()=>{
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users');

                const responseData = await response.json();
                setUsers(responseData.users);
                
            } catch (error) {
                setError(error.message || 'Something went wrong!');
            }
            setIsLoading(false);
        }
        sendRequest();
    }, []);

    return(
        <>
            {isLoading && <Loader size={48} />}
            {error && <p className="error-message">{error}</p>}
            {!isLoading && users && <UsersList items={users} />}
        </>
    )
}

export default Users;