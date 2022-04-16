import React, { useContext, useState } from 'react';
import Input from '../../shared/input/input';
import Loader from '../../shared/loader/loader';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validator';
import { LoginContext } from '../../shared/context/context';
import ErrorMessage from '../../shared/error-message/error-message';

import { useForm } from '../../shared/hooks/form-hook';
import { useFetchClient } from '../../shared/hooks/fetch-hook';

import './login.scss';

const Login = () => {
    const auth = useContext(LoginContext);
    const [isLogin, setIsLogin] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useFetchClient();

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

    const loginForm = async event => {
        event.preventDefault();

        if(isLogin){ 
            try {              
                const responseData = await sendRequest('http://localhost:5000/api/users/login', 'POST',JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }), {'Content-Type': 'application/json'})
    
                auth.login(responseData.user.id);
            } catch (error) {}
        }else{
            try {        
                const responseData = await sendRequest('http://localhost:5000/api/users/signup','POST',JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),{'Content-Type': 'application/json'}
                )
                auth.login(responseData.user.id);
            } catch (error) {}
        }
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
        {isLoading && <Loader size={48} />}
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
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter your password"
                onInput={inputHandler}
            />
            {error && <ErrorMessage  message={error} clearError={clearError}/>}
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