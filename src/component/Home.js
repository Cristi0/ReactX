import * as React from 'react';
import {Button, TextInput, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {login} from './Utils/Networking';
import {_retrieveData, _storeData} from './Utils/Local';
import {DetailsScreen} from './ListNote';
import {Harti} from './Harti';
import {Diagrama} from './Diagrama';

//const serverIp = '192.168.0.105:3000';

global.tokenAplicatie = "";

export class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.datestocate();
        this.state = {
            user: '',
            pass: '',
            ConnectionLost: false,
            isLoading: true,
            WrongPass: false,
            dataSource: null,
        };
    }

    async datestocate() {
        var data = await _retrieveData('user');
        var json = JSON.parse(data);
        this.setState({user: json.user});
        this.setState({pass: json.pass});
    }

    async login(username, password) {
        await login(username,password).then((response) => response.json())
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
            <>
                <View style={styles.container2}>
                    {this.state.WrongPass ? this.state.ConnectionLost ?
                        <Text style={styles.textError}>Conexiunea la server a fost pierduta!</Text> :
                        <Text style={styles.textError}>Numele sau parola incorecte!</Text> : <Text></Text>}
                </View>
                <View style={styles.container}>
                    <TextInput style={styles.input}
                               placeholder="Nume"
                               returnKeyType="go"
                        //onChangeText = { (user) => this.setState({user})}
                               onChangeText={(user) => this.setState({user: user})}
                               keyboardType="email-address"
                               autoCapitalize="none"
                               autoCorrect={false}
                               value={this.state.user}
                    />
                    <TextInput style={styles.input}
                               placeholder="Parola"
                               returnKeyType="go"
                               secureTextEntry
                               onChangeText={(pass) => this.setState({pass: pass})}
                               value={this.state.pass}
                    />
                    <TouchableOpacity style={styles.buttoncontainer} onPress={async () => {
                        this.setState({isLoading: true});
                        this.setState({dataSource: undefined});
                        var username = this.state.user;
                        var parola = this.state.pass;
                        //console.log('              ' + this.state.user + '   ' + this.state.pass);
                        await this.login(username,parola);
                        let token = this.state.dataSource;
                        this.setState({WrongPass: token == undefined ? true : false});
                        this.setState({ConnectionLost: this.state.isLoading});
                        if (token==undefined) {
                            /*<View style={styles.container}>
                                <ActivityIndicator/>
                            </View>;*/
                            console.log('Trying');
                        } else {
                            console.log('Content Loaded   ' + token);       //todo: transmitere token la alta clasa/pagina afisare lista item salvare locala date digrama, harti
                            _storeData('user', {user: username, pass: parola});
                            global.tokenAplicatie = token;
                            this.props.navigation.navigate('Details');
                        }

                    }}>
                        <Text style={styles.buttontext}>Login</Text>
                    </TouchableOpacity>
                </View>
            </>
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



const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
        Harti: Harti,
        Diagrama: Diagrama,
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
    container2: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textError: {
        fontSize: 15,
        color: 'red',
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