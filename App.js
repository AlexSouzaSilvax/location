import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, ScrollView, Alert, TextInput } from 'react-native';
import { Location, Permissions } from 'expo';
import MapView from 'react-native-maps';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      status: '',
      logradouro: '',
      numero: '',
      cidade: '',
      pais: '',
      la: 0,
      lo: 0,
      nomeApp: '<Guanabara/>',
      enderecoBusca: ''
    };
  }

  async requestLocation() {
    this.setState({
      status: 'Buscando sua localização',
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
      const { latitude, longitude } = location.coords; //retorna apenas a latitude, longitud  e do objeto.
      // alert(latitude);
      let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      this.setState({
        //status: geocode[0].street + ', ' + geocode[0].name + ' - ' + geocode[0].region, // + ', ' + geocode[0].country,
        logradouro: geocode[0].street,
        numero: geocode[0].name,
        cidade: geocode[0].region,
        pais: geocode[0].country,
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

  async btnEnderecoBusca() {
    Alert.alert(this.state.enderecoBusca);

    /* Pegar o valor do state: enderecoBusca, e pesquisar a latitude e longitude do mesmo. YOU consegue*/


  }

  componentDidMount() {
    this.requestLocation();
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ margin: 15, top: 12, flexDirection: 'row' }}>
          <Text style={{ fontSize: 18 }} >Destino: </Text>
          <TextInput style={{ borderRadius: 8, borderWidth: 1, borderColor: '#16164E', width: 200, margin: 2 }} onChangeText={(text) => this.setState({ enderecoBusca: text })} />

          <Button style={styles.button} onPress={() => this.btnEnderecoBusca()} title='Buscar' />

        </View>

        <View style={styles.containerEnd}>
          <MapView
            style={styles.mapView}
            loadingEnabled={true}
            region={{
              latitude: this.state.la,
              longitude: this.state.lo,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >

            <MapView.Marker
              coordinate={{
                latitude: this.state.la,
                longitude: this.state.lo
            }}
            
      
            />

          </MapView>

          <ScrollView
            style={styles.placesContainer}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
            <View style={styles.place}>
              <Text style={{ fontSize: 22, color: 'grey' }}>{this.state.nomeApp}</Text>
              <Text />
              <Text style={{ fontSize: 16 }}>{this.state.logradouro}, {this.state.numero}</Text>
              <Text style={{ fontSize: 18 }}>{this.state.cidade} - {this.state.pais}</Text>
              <Text />
              <Text>Destino: {this.state.enderecoBusca}</Text>
              <Text />
              <Button style={{ backgroundColor: '#16164E' }} title="Aonde Estou" onPress={() => this.requestLocation()} />
            </View>
          </ScrollView>
        </View>

      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerEnd: {
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
    height: height,
    width: width
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
    justifyContent: 'center',
    alignItems: 'center'
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
  button: {
    backgroundColor: '#16164E'
  }
});
