import './error-message.scss';

const ErrorMessage = ({message, clearError}) => {
    return(
        <p className="error-message">
            {message}
            <span className="error-close" onClick={clearError}>x</span>
        </p>
    )
}

export default ErrorMessage;