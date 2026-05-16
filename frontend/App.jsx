import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  // #D7F6BFFF
  // #72C37AFF
  // #FFCCCC
  // #CABFEEFF

  container: {
    width: "100%",
    height: "100%",
    padding: "20%",
    backgroundColor: "#fff",
    gap: 15,
  },
});
