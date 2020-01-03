import AsyncStorage from '@react-native-community/async-storage';


export async function _storeData (file,jsonobject) {
    try {
        var json =JSON.stringify(jsonobject);
        await AsyncStorage.setItem(file, json);
    } catch (error) {
        // Error saving data
    }
};
export async function _retrieveData(file) {
    try {
        const value = await AsyncStorage.getItem(file);
        if (value !== null) {
            // We have data!!
            console.log(value);
            return value;
        }
        return value;
    } catch (error) {
        // Error retrieving data
    }
};