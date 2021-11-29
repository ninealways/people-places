import React, {useRef, useEffect} from 'react';

import './map.scss';

const Map = (props) => {

    const mapRef = useRef();

    const {center, zoom} = props;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom,
        });
    
        new window.google.maps.Marker({position: center, map: map})
    }, [center, zoom]);

    return(
        <div className="mymap">
            <div ref={mapRef} className={`map ${props.className? props.className: ''}`} style={props.style}></div>
        </div>
    )
}

export default Map;