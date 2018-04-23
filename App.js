import React from 'react';
import {Text, View, Platform, TouchableOpacity, StyleSheet, Button, WebView } from 'react-native';
import {Platform, Text, View, StyleSheet} from 'react-native';
import {Constants, WebBrowser, Location, Permissions, MapView} from 'expo';
import {Marker} from 'react-native-maps';

console.disableYellowBox = true;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            errorMessage: null
        };
    }


    async componentDidMount() {
        await this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});

        this.setState({location: location});

    };

    render() {
        let text = 'Waiting..';
        let myLoc = [];

        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {

            myLoc[0] = JSON.stringify(this.state.location.coords.latitude);
            myLoc[1] = JSON.stringify(this.state.location.coords.longitude);

            console.log(text);
        }

        return (

            <View style={{flex: 1}}>
                <Text style={styles.paragraph}>{myLoc[0]}, {myLoc[1]}</Text>
                {this.state.location &&
                <MapView
                    style={{flex: 1}}
                    initialRegion={{
                        latitude: this.state.location.coords.latitude,
                        longitude: this.state.location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation={true}
                >
                <MapView.Marker
                    coordinate={{latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude}}
                    title={"You"}
                    description={"On mobile"}
                />
                </MapView>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
});