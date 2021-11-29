import React, { useCallback, useReducer } from 'react';
import Input from '../../shared/input/input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validator';

import './place.scss';

const formReducer = (state, action) => {
    switch (action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            };
        
        default:
            return state;
    }
};

const NewPlace = () => {

    const[formState, dispatch] = useReducer(formReducer, {
        inputs: {
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
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id})
    }, []);

    const placeSubmit = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }
    return(
        <form className="place-form">
            <Input 
                id="title"
                type="text" 
                label="title" 
                element="input" 
                errorText="Please enter a valid title"
                validators={[VALIDATOR_REQUIRE()]}
                onInput = {inputHandler}
            />
            <Input 
                id="description"
                label="Description" 
                element="textarea" 
                errorText="Please enter atleast 5 characters"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput = {inputHandler}
            />
            <Input 
                id="address"
                label="Address" 
                element="input" 
                errorText="Please enter a valid addresss"
                validators={[VALIDATOR_REQUIRE()]}
                onInput = {inputHandler}
            />
            <button className="btn btn-green" onClick={placeSubmit} type="submit" disabled={!formState.isValid}>Add Place</button>
        </form>
    )
}

export default NewPlace;