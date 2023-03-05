import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [mapregion, Setmapregion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 30,
    longitudeDelta: 30,
  });

  const Getlocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    Setmapregion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.000918,
      longitudeDelta: 0.000418,
    });
  };
  return (
    <View style={styles.container}>
      <Button title="Get Location" onPress={Getlocation} />
      <MapView
        style={{ height: "50%", width: "100%", margin: 10 }}
        region={mapregion}
      >
        <Marker coordinate={mapregion} title="Your are here" draggable={true} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
