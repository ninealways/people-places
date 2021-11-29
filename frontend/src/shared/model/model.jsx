import React from 'react';
import ReactDOM from 'react-dom';

import './model.scss';

const ModelOverlay = props => {
    const content = (
        <div className={`mymodel ${props.modelClassName ? props.modelClassName : ''}`}>
            <div className="model-overlay"></div>
            <div className={`model ${props.className ? props.className : ''}`} style={props.style}>
                <div className="close-btn" onClick={props.onCancel}>X</div>
                <div className={`model-header ${props.headerClass ? props.headerClass : ''}`}>
                    {props.header}
                </div>
                <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
                    <div className={`model-content ${props.contentClass}`}>
                        {props.children}
                    </div>

                    <div className={`model-footer w-100 center ${props.footerClass? props.footerClass: ''}`}>
                        {props.footer}
                    </div>
                </form>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        content,
        document.getElementById('mymodel')
    );
}

const Model = (props) => {
    return (
        <>
            {props.showMap? <ModelOverlay {...props} />: ''}
        </>
    )
}

export default Model;