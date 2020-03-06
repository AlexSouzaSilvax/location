import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";

export default function Teste() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    getLocation();
  }, [latitude, longitude]);

  async function getLocation() {
    const location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000
      },
      newLocation => {
        let coords = newLocation.coords;
        console.log("latitude: " + coords.latitude);
        console.log("longitude: " + coords.longitude);
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      },
      error => console.log(error)
    );
    return location;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        loadingEnabled={true}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
        rotateEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
        showsPointsOfInterest={true}
        showBuildings={true}
      >
        <MapView.Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude
          }}
        />
      </MapView>
    </View>
  );
}

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },

  mapView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  placesContainer: {
    width: "100%",
    maxHeight: 200
  },

  place: {
    width: width - 40,
    maxHeight: 200,
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "transparent"
  },

  description: {
    color: "#999",
    fontSize: 12,
    marginTop: 5
  }
});
