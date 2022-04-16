import React, { useEffect, useState } from 'react';
import UsersList from '../../components/userslist/userslist';
import ErrorMessage from '../../shared/error-message/error-message';
import Loader from '../../shared/loader/loader';

import { useFetchClient } from '../../shared/hooks/fetch-hook';

import './users.scss';

const Users = () => {

    const [users, setUsers] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useFetchClient();

    useEffect(()=>{
        const getUsers = async() =>{
            try {              
                const usersData = await sendRequest('http://localhost:5000/api/users');
                setUsers(usersData.users);
            } catch (error) {} 
        }
        getUsers();
    }, [sendRequest]);

    return(
        <>
            {isLoading && <Loader size={48} />}
            {error && <ErrorMessage  message={error} clearError={clearError}/>}
            {!isLoading && users && <UsersList items={users} />}
        </>
    )
}

export default Users;