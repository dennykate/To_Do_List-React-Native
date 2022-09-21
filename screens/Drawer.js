import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import profile from "../assets/profile.jpg";

import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";

const COLORS = [
  {
    item: "Pink",
    color: "#EF629F",
  },
  {
    item: "Red",
    color: "#ED213A",
  },
  {
    item: "Purple",
    color: "#c471ed",
  },
  {
    item: "Sky Blue",
    color: "#009FFF",
  },
  {
    item: "Orange",
    color: "#F37335",
  },
  {
    item: "Dark Blue",
    color: "#1D2671",
  },
  {
    item: "Coffee",
    color: "#B79891",
  },
  {
    item: "Light Green",
    color: "#78ffd6",
  },
  {
    item: "Nueromancer",
    color: "#f953c6",
  },
];

const Drawer = () => {
  const [color, setColor] = useState({ item: "Pink", color: "#EF629F" });
  const [colorCode, setColorCode] = useState();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorCode ? colorCode : "#EF629F" },
      ]}
    >
      <Image source={profile} style={styles.profile} />

      <View style={styles.theme}>
        <Text style={styles.themeText}>Select Theme</Text>
        <SelectBox
          label=""
          options={COLORS}
          value={color}
          onChange={(data) => {
            setColor(data);
            setColorCode(data.color);
          }}
          hideInputFilter={true}
          optionContainerStyle={{ width: 200 }}
          optionsLabelStyle={{
            color: "#fff",
            fontSize: 13,
            marginHorizontal: 10,
          }}
          selectedItemStyle={{
            color: "#fff",
            width: 200,
            marginHorizontal: 10,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EF629F",
    justifyContent: "flex-start",
  },
  profile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 60,
    marginHorizontal: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginHorizontal: 25,
    marginTop: 20,
  },
  list: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#434343",
    marginHorizontal: 25,
    marginTop: 20,
  },
  theme: {
    marginVertical: 150,
    marginHorizontal: 20,
    width: 200,
  },
  themeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  select: {
    width: 200,
    backgroundColor: "#fff",
  },
});

export default Drawer;
