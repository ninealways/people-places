import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../../components/placelist/placelist';
import ErrorMessage from '../../shared/error-message/error-message';
import Loader from '../../shared/loader/loader';
import { useFetchClient } from '../../shared/hooks/fetch-hook';

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useFetchClient();

    const userId = useParams().userId;

    useEffect(()=> {
        const getPlaces = async() => {
            try {              
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            } catch (error) {}
        }
        getPlaces();
    }, [sendRequest, userId]);

    const onDeletePlace = (deletedPlaceId) => {
        setLoadedPlaces(prev => prev.filter(place => place.id !== deletedPlaceId))
    }
    
    return (
        <>
            {isLoading && <Loader size={48} />}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={onDeletePlace}/>}
            {!loadedPlaces && error && <ErrorMessage  message={error} clearError={clearError}/>}
        </>
    )
}

export default UserPlaces;