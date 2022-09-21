import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-shadow-cards";
import LottieView from "lottie-react-native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskCard = ({ getData }) => {
  const [loaded] = useFonts({
    "Roboto-MediumItalic": require("../../assets/fonts/Roboto-MediumItalic.ttf"),
    "DancingScript-Medium": require("../../assets/fonts/DancingScript-Medium.ttf"),
    "Roboto-Thin": require("../../assets/fonts/Roboto-Thin.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Card style={styles.container}>
      <Text style={styles.time}>12 : 24 AM / 22.12.2022</Text>
      <View style={styles.cardBody}>
        <View style={styles.taskAndBtn}>
          <Text style={styles.task}>Watch English Youtube Channel</Text>
          <View style={styles.taskBotton}>
            <ConfirmButton getData={getData} />
            <CancleButton />
          </View>
        </View>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require("../../assets/animation/sleep.json")}
            autoPlay
            loop
            speed={1}
            style={styles.lottie}
          />
        </View>
      </View>
    </Card>
  );
};

const ConfirmButton = ({ getData }) => (
  <TouchableOpacity
    style={[styles.btn, { backgroundColor: "#38ef7d" }]}
    onPress={() => {
      getData;
    }}
  >
    <Text style={[styles.btnText, { color: "#414345" }]}>Confirm</Text>
  </TouchableOpacity>
);

const CancleButton = () => (
  <TouchableOpacity style={[styles.btn, { backgroundColor: "#f00000" }]}>
    <Text style={[styles.btnText, { color: "#fff" }]}>Delete</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: 350,
    minHeight: 130,
    backgroundColor: "#F5F5F5",
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    paddingBottom: 10,
  },
  time: {
    margin: 5,
    fontSize: 11,
    fontWeight: "bold",
  },
  cardBody: {
    width: 330,
    minHeight: 100,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  taskAndBtn: {
    width: "70%",
    height: "100%",
    marginBottom: 20,
  },
  task: {
    fontSize: 15,
    color: "#0f0c29",
    fontFamily: "DancingScript-Medium",
  },
  lottieContainer: {
    width: "30%",
    height: "100%",
  },
  lottie: {
    width: "100%",
    height: 100,
    alignSelf: "center",
  },
  taskBotton: {
    width: "100%",
    height: 20,
    position: "absolute",
    bottom: 2,
    flexDirection: "row",
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    width: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  btnText: {
    fontSize: 11,
    fontWeight: "bold",
  },
});

export default TaskCard;
