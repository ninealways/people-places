import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../shared/context/context';
import ErrorMessage from '../../shared/error-message/error-message';
import Loader from '../../shared/loader/loader';
import Input from '../../shared/input/input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validator';

import { useForm } from '../../shared/hooks/form-hook';
import { useFetchClient } from '../../shared/hooks/fetch-hook';

import './place.scss';



const NewPlace = () => {
    const auth = useContext(LoginContext);
    const { isLoading, error, sendRequest, clearError } = useFetchClient();

    const [formState, inputHandler] = useForm({
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        false
    )

    const history = useHistory();
    const placeSubmit = async event => {
        event.preventDefault();

        try {              
            await sendRequest('http://localhost:5000/api/places', 'POST',JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value,
                creator: auth.userId
            }), {'Content-Type': 'application/json'})
            history.push('/');
        } catch (error) {}
    }
    return (
        <form className="place-form">
            {isLoading && <Loader size={48} />}
            <Input
                id="title"
                type="text"
                label="title"
                element="input"
                errorText="Please enter a valid title"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
            />
            <Input
                id="description"
                label="Description"
                element="textarea"
                errorText="Please enter atleast 5 characters"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
            />
            <Input
                id="address"
                label="Address"
                element="input"
                errorText="Please enter a valid addresss"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
            />
            {error && <ErrorMessage  message={error} clearError={clearError}/>}
            <button className="btn btn-green" onClick={placeSubmit} type="submit" disabled={!formState.isValid}>Add Place</button>
        </form>
    )
}

export default NewPlace;