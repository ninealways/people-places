import React from 'react';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/input/input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validator';

import './place.scss';

const NewPlace = () => {
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
    const placeSubmit = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }
    return (
        <form className="place-form">
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
            <button className="btn btn-green" onClick={placeSubmit} type="submit" disabled={!formState.isValid}>Add Place</button>
        </form>
    )
}

export default NewPlace;