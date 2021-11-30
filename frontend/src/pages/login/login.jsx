import React, { useContext, useState } from 'react';
import { LoginContext } from '../../shared/context/context';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/input/input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validator';

import './login.scss';

const Login = () => {
    const auth = useContext(LoginContext);

    const [isLogin, setIsLogin] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        }
    }, false);

    const loginForm = event => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    const switchModeHandler = () => {
        if(!isLogin){
            setFormData({
                ...formState.inputs,
                name: undefined
            },formState.inputs.email.isValid && formState.inputs.password.isValid);
        }else{
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false,
                }
            },false);
        }
        setIsLogin(prev => !prev);
    }

    return (
    <div className="place-form">
        <form onSubmit={loginForm} >
            <h2 className="center">Login</h2>
            {!isLogin 
                ?  
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Username"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter your name"
                    onInput={inputHandler}
                />
                : ''
            }
            <Input
                id="email"
                element="input"
                type="email"
                label="Email"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email"
                onInput={inputHandler}
            />
            <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter your password"
                onInput={inputHandler}
            />
            <button 
                className="btn btn-green" 
                type="submit" 
                disabled={!formState.isValid}
            >
                {isLogin ? 'Login' : 'Signup'}
            </button>
        </form>
        <br/>
        <button 
            className="btn btn-blue" 
            onClick={switchModeHandler}
        >
            Switch to {!isLogin ? 'Login' : 'Signup'}
        </button>
    </div>
    )
}

export default Login;