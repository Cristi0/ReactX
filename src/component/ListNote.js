import * as React from 'react';
import {Button, Text, View, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import {addNota, delNota, getItems} from './Utils/Networking';
import DialogInput from 'react-native-dialog-input';

export class DetailsScreen extends React.Component {
    state = {
        wait: true,
        loaded: false,
        jsonArray: [{id: '', key: ''}],


        isDialogVisible: false,
        dialogInput: '',
        titludialog: '',
        messajdialog: '',
        hintdialog: '',

        isAdd:false,
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
                    arr.push({key: responseJson[i]._id, nota: responseJson[i].text});
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

    async adauga(inputText) {
        await addNota(global.tokenAplicatie, inputText).then((response) => response.json())
            .then((responseJson) => {
                var arr = this.state.jsonArray;
                arr.push({key: responseJson._id, nota: responseJson.text});
                this.setState({
                    jsonArray: arr,
                });
            })
            .catch((error) => {
                console.log((error));
            });
    }
    async delete(inputText) {
        await delNota(global.tokenAplicatie,inputText)
            .then((responseJson) => {
                this.setState({
                    jsonArray:  this.state.jsonArray.filter(function(json) {        //todo: de facut local storage queue
                            return json.key !== inputText;
                        }),
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


                <DialogInput isDialogVisible={this.state.isDialogVisible}
                             title={this.state.titludialog}
                             message={this.state.messajdialog}
                             hintInput ={this.state.hintdialog}
                             submitInput={ (inputText) => {
                                 if(this.state.isAdd){
                                     this.adauga(inputText);
                                 }else{
                                     this.delete(inputText);
                                 }
                             } }
                             closeDialog={ () => {this.setState({isDialogVisible:false})}}>
                </DialogInput>





                <View style={styles.container3}>
                    {this.state.loaded ? <Text></Text> : <ActivityIndicator size="large"/>}
                    <View style={styles.buttoncontainer}>
                        <TouchableOpacity
                            style={styles.buttoncontainer}
                            onPress={() => {
                                this.setState({
                                    isDialogVisible: true,
                                    titludialog: 'Adaugare',
                                    messajdialog: 'Introduceti nota',
                                    hintdialog: 'Nota',
                                    isAdd: true,
                                });
                            }}>
                            <Text style={styles.buttontext}>Adauga</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.divider}></Text>
                    <View style={styles.buttoncontainer}>
                        <TouchableOpacity
                            style={styles.buttoncontainer}
                            onPress={() => {
                                this.setState({
                                    isDialogVisible: true,
                                    titludialog: 'Stergere',
                                    messajdialog: 'Introduceti id-ul notei',
                                    hintdialog: 'Id',
                                    isAdd: false,
                                });
                                console.log(this.state.dialogInput);
                            }}>
                            <Text style={styles.buttontext}>Sterge</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.divider}></Text>
                    <View style={styles.buttoncontainer}>
                        <TouchableOpacity
                            style={styles.buttoncontainer}
                            onPress={() => this.props.navigation.navigate('Harti')}>
                            <Text style={styles.buttontext}>Harti</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.divider}></Text>
                    <View style={styles.buttoncontainer}>
                        <TouchableOpacity
                            style={styles.buttoncontainer}
                            onPress={() => this.props.navigation.navigate('Diagrama')}>
                            <Text style={styles.buttontext}>Diagrama</Text>
                        </TouchableOpacity>
                    </View>
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