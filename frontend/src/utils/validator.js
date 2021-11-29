const TYPE_REQUIRE = 'REQUIRE';
const TYPE_MINLENGTH = 'MINLENGTH';
const TYPE_MAXLENGTH = 'MAXLENGTH';
const TYPE_MIN = 'MIN';
const TYPE_MAX = 'MAX';
const TYPE_EMAIL = 'EMAIL';
const TYPE_FILE = 'FILE';

export const VALIDATOR_REQUIRE = () => ({type: TYPE_REQUIRE});
export const VALIDATOR_FILE = () => ({type: TYPE_FILE});
export const VALIDATOR_EMAIL = () => ({type: TYPE_EMAIL});
export const VALIDATOR_MINLENGTH = (val) => ({type: TYPE_MINLENGTH, val: val});
export const VALIDATOR_MAXLENGTH = (val) => ({type: TYPE_MAXLENGTH, val: val});
export const VALIDATOR_MIN = (val) => ({type: TYPE_MIN, val: val});
export const VALIDATOR_MAX = (val) => ({type: TYPE_MAX, val: val});

export const validate = (value, validators) => {
    let isValid = true;
    for(const validator of validators){
        if(validator.type === TYPE_REQUIRE){
            isValid = isValid && value.trim().length > 0;
        }

        if(validator.type === TYPE_MINLENGTH){
            isValid = isValid && value.trim().length >= validator.val;
        }

        if(validator.type === TYPE_MAXLENGTH){
            isValid = isValid && value.trim().length <= validator.val;
        }

        if(validator.type === TYPE_MIN){
            isValid = isValid && +value >= validator.val;
        }

        if(validator.type === TYPE_MAX){
            isValid = isValid && +value <= validator.val;
        }

        if(validator.type === TYPE_EMAIL){
            isValid = isValid && 	
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        }
    }
    return isValid;
}