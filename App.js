import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function App() {
  const [location, setlocation] = useState("");

  const Getlocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    setlocation(currentLocation);
  };
  return (
    <View style={styles.container}>
      {location && (
        <>
          <Text>Your Latitude : {location.coords.latitude}</Text>
          <Text>Your Longitude : {location.coords.longitude}</Text>
        </>
      )}
      <Button title="Get Location" onPress={Getlocation} />
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
