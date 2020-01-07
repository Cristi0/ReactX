import * as React from 'react';
import {getItems} from './Utils/Networking';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export class Harti extends React.Component {
    state = {
        wait: true,
        loaded: false,
        jsonArray: [{id: '', key: ''}],
    };

    constructor(props) {
        super(props);
    }


    render() {
        return (
                <MapView
                    //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{flex: 1}}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    showsUserLocation
                />
        );
    }
}

const styles = {
    container: {
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    container2: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container3: {
        padding: 20,
        flex: 1,
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        alignItems: 'stretch',
        height: 50,
    },
    textError: {
        fontSize: 15,
        color: 'red',
    },
    buttoncontainer: {
        height: 50,
        borderRadius: 50,
        backgroundColor: '#1abc9c',
        justifyContent: 'center',
    },
    buttontext: {
        textAlign: 'center',
        color: '#ecf0f1',
        fontSize: 20,
    },
    divider:{
        height: 10,
    }

};