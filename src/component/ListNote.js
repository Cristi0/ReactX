import * as React from 'react';
import {Button, Text, View, ActivityIndicator, FlatList} from 'react-native';
import {getItems} from './Utils/Networking';

export class DetailsScreen extends React.Component {
    state = {
        wait: true,
        loaded: false,
        jsonArray: [{id:'',key:''}],
    };

    constructor(props) {
        super(props);
        this.receiveData(); ///todo: de afisat animatia aici
    }
     receiveData() {

        getItems(global.tokenAplicatie).then((response) => response.json())
            .then((responseJson) => {
                var arr = [];
                for (var i = 0; i < responseJson.length; i++) {
                    arr.push({key: responseJson[i]._id, nota: responseJson[i].text})
                }
                this.setState({
                    jsonArray: arr,
                });
                this.setState({
                    loaded: true,
                });
            })
            .catch((error) => {
                console.log((error));
            });
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.jsonArray}
                        renderItem={({item}) => <Text style={styles.item}>{item.nota}</Text>}
                    />
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    {this.state.loaded ? <Text></Text> : <ActivityIndicator size="large"/>}
                    <Text>Details Screen</Text>
                    <Button
                        title="Go to Details... modific "
                        onPress={() => this.props.navigation.navigate('Details')}
                    />
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
};