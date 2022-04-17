import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/input/input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validator';
import ErrorMessage from '../../shared/error-message/error-message';
import Loader from '../../shared/loader/loader';

import { LoginContext } from '../../shared/context/context';
import { useFetchClient } from '../../shared/hooks/fetch-hook';

import './place.scss';

const UpdatePlace = props => {
    const auth = useContext(LoginContext);
    const placeId = useParams().placeId;
    const [loadedPlace, setLoadedPlace] = useState(null);
    const history = useHistory();

    const {isLoading, error, sendRequest, clearError} = useFetchClient();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false,
        },
        description: {
            value: '',
            isValid: false,
        }
    }, true);

    useEffect(()=>{
        const getPlace = async () =>{
            try {              
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setLoadedPlace(responseData.place);
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true,
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true,
                    }
                }, true);
            } catch (error) {}
        }
        getPlace();
    }, [sendRequest, placeId, setFormData]);

    const placeUpdateSubmit = async event => {
        event.preventDefault();
        try {         
            await sendRequest(`http://localhost:5000/api/places/${placeId}`, 'PATCH', JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
            }),{'Content-Type': 'application/json'});
            history.push(`/${auth.userId}/places`);
        } catch (error) {}
    }

    if(!loadedPlace && !error) {
        return(
            <div className="userlist center">
                <h2 className="no-users">No places found!</h2>
                <div className="w-100 center">
                    <Link to="/places/new" className="btn btn-green">Share Place</Link>
                </div>
            </div>
        )
    }

    return (
        <>
            {isLoading && <Loader size={48} />}
            {!isLoading && loadedPlace && 
                <form className="place-form" onSubmit={placeUpdateSubmit} >
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title"
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter atleast 5 characters"
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        initialValid={true}
                    />
                    <button className="btn btn-green" type="submit" disabled={!formState.isValid}>Update Place</button>
                </form>
            }
            {!loadedPlace && error && <ErrorMessage  message={error} clearError={clearError}/>}
        </>
    )
}

export default UpdatePlace;