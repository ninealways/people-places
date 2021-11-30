import React, { useEffect, useReducer } from 'react';
import { validate } from '../../utils/validator';

import './input.scss';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };

        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            }
        default:
            return state;
    }
}

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, { 
        value: props.initialValue || '', 
        isValid: props.initialValid || false, 
        isTouched: false, 
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [onInput, id, value, isValid]);
    
    const inputChange = event => {
        dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    const element = props.element === 'input' ?
        (<input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onBlur={touchHandler}
            value={inputState.value}
            onChange={inputChange} />)
        :
        (<textarea
            id={props.id}
            rows={props.rows || 3}
            onBlur={touchHandler}
            onChange={inputChange}
            value={inputState.value}
        />);

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input;