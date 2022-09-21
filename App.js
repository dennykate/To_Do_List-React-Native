import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Drawer from "./screens/Drawer";
import Home from "./screens/Home";

const App = () => {
  return (
    <View style={styles.container}>
      <Drawer />
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
