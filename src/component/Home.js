import * as React from 'react';
import {Button, TextInput, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ActivityIndicatorViewNativeComponent
    from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent';

const serverIp = '192.168.0.105:3000';

export class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            isLoading: true,
            dataSource: null,
        };
    }

    async login() {
        return await fetch('http://' + serverIp + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                'username': this.state.user,
                'password': this.state.pass,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.token,
                });
            })
            .catch((error) => {
                console.log((error));
            });
    }

    render() {

        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                           placeholder="Nume"
                           returnKeyType="go"
                    //onChangeText = { (user) => this.setState({user})}
                           onChangeText={(user) => this.setState({user: user})}
                           keyboardType="email-address"
                           autoCapitalize="none"
                           autoCorrect={false}
                />
                <TextInput style={styles.input}
                           placeholder="Parola"
                           returnKeyType="go"
                           secureTextEntry
                           onChangeText={(pass) => this.setState({pass: pass})}
                />
                <TouchableOpacity style={styles.buttoncontainer} onPress={async () => {
                    console.log('              ' + this.state.user + '   ' + this.state.pass);
                    await this.login();
                    if (this.state.isLoading) {
                        <View style={styles.container}>
                            <ActivityIndicator/>
                        </View>;
                        console.log('Trying');
                    } else {
                        let token = this.state.dataSource;
                        console.log('Content Loaded   ' + token);       //todo: transmitere token la alta clasa/pagina afisare lista item salvare locala date digrama, harti
                        //this.props.navigation.navigate('Details');
                    }
                }}>
                    <Text style={styles.buttontext}>Login</Text>
                </TouchableOpacity>
            </View>
            // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            //     <Text>Home Screen</Text>
            //     <Button
            //         title="Go to Details"
            //         onPress={() => this.props.navigation.navigate('Details')}
            //     />
            // </View>
        );
    }
}

export class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
    },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer/>;
    }
}

const styles = {
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    input: {
        paddingLeft: 20,
        borderRadius: 50,
        height: 50,
        fontSize: 25,
        backgroundColor: 'white',
        borderColor: '#1abc9c',
        borderWidth: 1,
        marginBottom: 20,
        color: '#34495e',
    },
    buttoncontainer: {
        height: 50,
        borderRadius: 50,
        backgroundColor: '#1abc9c',
        paddingVertical: 10,
        justifyContent: 'center',
    },
    buttontext: {
        textAlign: 'center',
        color: '#ecf0f1',
        fontSize: 20,
    },
};