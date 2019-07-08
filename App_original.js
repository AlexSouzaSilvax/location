import React from 'react';
import { Platform, StyleSheet, Text, View, Button, Dimensions, ScrollView } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MapView from 'react-native-maps';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      status: '',
      la: 0,
      lo: 0
    };
  }

  async requestLocation() {
    this.setState({
      status: 'Procurando sua localização',
    });

    console.log("Ask for location permission...");
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("Got back: " + status);

    if (status !== 'granted') {
      console.log("Failed to get geolocation: access not granted, status " + status);
      this.setState({
        status: status,
      });
      return;
    }

    try {
      console.log("Request geocode...");
      let location = await Location.getCurrentPositionAsync({}); //retorna o objeto com os atributos da localização
      console.log(location);
      const { latitude, longitude } = location.coords; //retorna apenas a latitude, longitude do objeto.
     // alert(latitude);
      let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      this.setState({
        status: geocode[0].street + ', ' + geocode[0].name + ' - ' + geocode[0].region + ', ' + geocode[0].country,
        la: latitude,
        lo: longitude
      });
    } catch (error) {
      console.log("Failed to get geolocation:");
      this.setState({
        status: error,
      });
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <MapView
          style={styles.mapView}
          loadingEnabled={true}
          region={{
            latitude: this.state.la,
            longitude: this.state.lo,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          showsPointsOfInterest={false}
          showBuildings={false}
        >
        </MapView>
        <ScrollView
          style={styles.placesContainer}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}>
          <View style={styles.place}>            
            <Text style={{ fontSize: 14 }}>{this.state.status}</Text>
            <Text/>
            <Button title="Aonde Estou" onPress={() => this.requestLocation()} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  placesContainer: {
    width: '100%',
    maxHeight: 200,
  },

  place: {
    width: width - 40,
    maxHeight: 200,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'transparent',
  },

  description: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
});
