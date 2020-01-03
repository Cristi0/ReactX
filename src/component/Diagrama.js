import * as React from 'react';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import {BarChart} from 'react-native-chart-kit';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export class Diagrama extends React.Component {
    state = {
        wait: true,
        loaded: false,
        jsonArray: [{id: '', key: ''}],
        dat: {
            labels: [],
            datasets: [
                {
                    data: [],
                },
            ]},
    };

    constructor(props) {
        super(props);
        this.tranformData();
    }
    tranformData(){
        var date = global.date;
        var labels = [];
        date.sort((a,b)=>{return a.nota.localeCompare(b.nota)});
        var data = [];

        for(var i=0;i<date.length;i++){
            if(labels.includes(date[i].nota)){
                var valoare =data.pop();
                data.push(valoare+1);
            }else{
                labels.push(date[i].nota);
                data.push(1);
            }
        }
        const {dat} =this.state;
        dat.labels=labels;
        dat.datasets[0].data=data
        this.setState({
                dat: dat,
        });
        console.log(this.state.dat);
        console.log(dat);
    }

    render() {
        /*const data = {
            labels: ["Nota 1", "Nota 2", "Nota 3", "Nota 4", "Nota 5", "Nota 6","Nota 7","Nota 8", "Nota 9","Nota 10"],
            datasets: [
                {
                    data: [0,2,3,2,2,3,1,2,3,1]
                }
            ]
        };*/
        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: "#000000",
            backgroundGradientToOpacity: 0.8,
            color: (opacity = 1) => `rgba(26,146, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
        };
        return (
            <>

                <BarChart
                    //style={graphStyle}
                    data={this.state.dat}
                    width={screenWidth}
                    height={screenHeight}
                    yAxisLabel={'Nr '}
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
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