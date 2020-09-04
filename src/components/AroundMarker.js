import React, {Component} from 'react';

import {Marker, InfoWindow} from "react-google-maps";

import blueMarkerUrl from '../assets/images/blue-marker.svg';

class AroundMarker extends Component {
    state = {
        isOpen: false
    };

    render() {
        const {isOpen} = this.state;
        const { user, message, url, location, type } = this.props.post;
        const { lat, lon } = location;
        const isImage = type === 'image';
        const customizedIcon = isImage ? undefined : {
            url: blueMarkerUrl,
            scaledSize: new window.google.maps.Size(26, 41)
        };

        return (
            <Marker position={{lat: lat, lng: lon}}
                    onClick={isImage ? undefined : this.handleToggle}
                    icon={customizedIcon}
                    onMouseOver={isImage ? this.handleToggle : undefined}
                    onMouseOut={isImage ? this.handleToggle : undefined}
            >
                {
                    isOpen ? (
                        <InfoWindow>
                            <div>
                                {
                                    isImage ?
                                    <img src={url} alt={message} className="around-marker-image"/> :
                                        <video src={url} controls className="around-marker-video"/>
                                }
                                <p>{`${user}: ${message}`}</p>
                            </div>
                        </InfoWindow>
                    ) : null
                }
            </Marker>
        );
    }

    handleToggle = () => {
        this.setState(preState => ({
            isOpen: !preState.isOpen
        }))
    }
}

export default AroundMarker;