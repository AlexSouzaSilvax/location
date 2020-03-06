import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { AnimatedRegion } from "react-native-maps";

export default function Teste() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [prevLaLng, setPrevLaLng] = useState({});
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude,
      longitude
    })
  );

  return (
    <View>
      <Text>Rá</Text>
    </View>
  );
}
