import * as React from 'react';
import {getItems} from './Utils/Networking';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from 'react-native';

export class Diagrama extends React.Component {
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
            <>
                <View style={styles.container2}>
                    <Text>Text</Text>
                </View>
            </>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    container2: {
        flex: 1,
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
    divider: {
        height: 10,
    },

};