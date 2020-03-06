import React, { Component } from "react";
import { Text, View } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        console.log("LATITUDE: " + position.coords.latitude);
        console.log("LONGITUDE: " + position.coords.longitude);

        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 1,
        maximumAge: 0,
        distanceFilter: 1
      }
    );
  }

  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchId);
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        console.log("LATITUDE: " + position.coords.latitude);
        console.log("LONGITUDE: " + position.coords.longitude);

        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 200,
        timeInterval: 200,
        maximumAge: 0,
        distanceFilter: 1
      }
    );
  }

  render() {
    return (
      <View
        style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 25 }}>LATITUDE: {this.state.latitude}</Text>
        <Text style={{ fontSize: 25 }}>LONGITUDE: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}
