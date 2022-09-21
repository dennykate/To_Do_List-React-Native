import React, { Component } from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Checkfile = ({ type }) => {
  if (type == "Wake up") {
    return (
      <LottieView
        source={require(`../assets/animation/wake.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "LCCI") {
    return (
      <LottieView
        source={require(`../assets/animation/lcci.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Date") {
    return (
      <LottieView
        source={require(`../assets/animation/date.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Wash Clothes") {
    return (
      <LottieView
        source={require(`../assets/animation/wash-and-ironing-clothes.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Eat Breakfast") {
    return (
      <LottieView
        source={require(`../assets/animation/breakfast.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Eat Lunch") {
    return (
      <LottieView
        source={require(`../assets/animation/lunch.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Eat Dinner") {
    return (
      <LottieView
        source={require(`../assets/animation/dinner.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Read Book") {
    return (
      <LottieView
        source={require(`../assets/animation/reading-book.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Practice Typing") {
    return (
      <LottieView
        source={require(`../assets/animation/practice-typing.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Practice Speaking") {
    return (
      <LottieView
        source={require(`../assets/animation/speaking.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Watch Youtube") {
    return (
      <LottieView
        source={require(`../assets/animation/watch-youtube.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Watch Movie") {
    return (
      <LottieView
        source={require(`../assets/animation/watch-movie.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Use Social Media") {
    return (
      <LottieView
        source={require(`../assets/animation/using-social-media.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Hangout With Friend") {
    return (
      <LottieView
        source={require(`../assets/animation/hangout-with-friend.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Skin Care") {
    return (
      <LottieView
        source={require(`../assets/animation/skincare.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Sleep") {
    return (
      <LottieView
        source={require(`../assets/animation/sleep.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Default") {
    return (
      <LottieView
        source={require(`../assets/animation/jumping-girl-animation.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Bicycling") {
    return (
      <LottieView
        source={require(`../assets/animation/bicycle.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Walking") {
    return (
      <LottieView
        source={require(`../assets/animation/walk.json`)}
        autoPlay
        loop
        speed={0.8}
        style={styles.lottie}
      />
    );
  } else if (type == "Listen Music") {
    return (
      <LottieView
        source={require(`../assets/animation/listen-music.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Shopping") {
    return (
      <LottieView
        source={require(`../assets/animation/shopping.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Delivery") {
    return (
      <LottieView
        source={require(`../assets/animation/delivery.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Workout") {
    return (
      <LottieView
        source={require(`../assets/animation/workout.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  } else if (type == "Shower") {
    return (
      <LottieView
        source={require(`../assets/animation/shower.json`)}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    );
  }
};

const styles = StyleSheet.create({
  lottie: {
    width: "100%",
    height: 100,
    alignSelf: "center",
  },
});

export default Checkfile;
