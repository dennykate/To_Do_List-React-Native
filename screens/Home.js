import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

import tesk_photo from "../assets/profit-growth-task.jpg";
import close from "../assets/close.png";
import LottieView from "lottie-react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";

import { LogBox } from "react-native";
import TaskCard from "./Components/TaskCard";
import { Easing } from "react-native-web";
import { linear } from "react-native/Libraries/Animated/Easing";
import { useFonts } from "expo-font";
import { Card } from "react-native-shadow-cards";
import DateTimePickerModal from "react-native-modal-datetime-picker";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  "NativeBase: The contrast ratio of",
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import Checkfile from "./CheckFile";

const Files = [
  {
    item: "Bicycling",
    code: "bicycle.json",
  },
  {
    item: "Date",
    code: "date.json",
  },
  {
    item: "Delivery",
    code: "delivery.json",
  },
  {
    item: "Eat Breakfast",
    code: "breakfast.json",
  },
  {
    item: "Eat Lunch",
    code: "lunch.json",
  },
  {
    item: "Eat Dinner",
    code: "dinner.json",
  },
  {
    item: "Hangout With Friend",
    code: "hangout-with-friend.json",
  },
  {
    item: "LCCI",
    code: "date.json",
  },
  {
    item: "Listen Music",
    code: "listen-music.json",
  },
  {
    item: "Practice Typing",
    code: "practice-typing.json",
  },
  {
    item: "Practice Speaking",
    code: "speaking.json",
  },
  {
    item: "Read Book",
    code: "reading-book.json",
  },
  {
    item: "Shopping",
    code: "shopping.json",
  },
  {
    item: "Shower",
    code: "shower.json",
  },
  {
    item: "Skin Care",
    code: "skincare.json",
  },
  {
    item: "Sleep",
    code: "sleep.json",
  },
  {
    item: "Use Social Media",
    code: "using-social-media.json",
  },
  {
    item: "Wake up",
    code: "wake.json",
  },
  {
    item: "Wash Clothes",
    code: "wash-and-ironing-clothes.json",
  },
  {
    item: "Watch Youtube",
    code: "watch-youtube.json",
  },
  {
    item: "Watch Movie",
    code: "watch-movie.json",
  },
  {
    item: "Walking",
    code: "walk.json",
  },
  {
    item: "Workout",
    code: "workout.json",
  },
  {
    item: "Default",
    code: "jumping-girl-animation.json",
  },
  {
    item: "Default",
    code: "jumping-girl-animation.json",
  },
];

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [stopRotate, setStopRotate] = useState(false);
  const [fresh, setFresh] = useState(false);
  const [type, setType] = useState({
    item: "Default",
    code: "../assets/animation/jumping-girl-animation.json",
  });
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [about, setAbout] = useState();
  const [tasks, setTasks] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selected, setSelected] = useState(false);
  const [failAnimation, setFailAnimation] = useState(false);
  const [successAnimaiton, setSuccessAnimaiton] = useState(false);
  const [removeAllDataAnimation, setRemoveAllDataAnimation] = useState(false);
  const [confirmRemoveAllData, setConfirmRemoveAllData] = useState(false);
  const [introAnimation, setIntroAnimation] = useState(false);
  const [menstruationDatePicker, setMenstruationDatePicker] = useState(false);
  const [currentMenstruationDate, setCurrentMenstruationDate] = useState();
  const [upMenstruationDate, setUpMenstruationDate] = useState();

  const rotateValue = new Animated.Value(0);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const modalScaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getAllData = async () => {
      setFresh(false);
      const keys = await AsyncStorage.getAllKeys();

      if (keys.length > 0) {
        const newKeys = keys.filter((key) => key !== "menstruationDate");
        const data = await AsyncStorage.multiGet(newKeys);
        const dataArr = [];

        for (let i = 0; i < data.length; i++) {
          dataArr.push(JSON.parse(data[i][1]));
        }
        const sortedData = sort_data(dataArr);

        setTasks(sortedData);
        setSelected(false);
      } else {
        setTasks([]);
        setSelected(false);
      }
    };
    getAllData();
    getMenstruationDate();

    // const Remove = async () => {
    //   const keys = await AsyncStorage.getAllKeys();
    //   await AsyncStorage.multiRemove(keys);
    // };
    // Remove();
  }, [fresh]);

  const today = () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const time = new Date();
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const date = weekday[time.getDay()];

    return `Today is ${day} - ${month} - ${year} ( ${date} )`;
  };

  const sort_data = (arr) => {
    let amArr = arr
      .filter((x) => x["Time"].split(" ")[1] == "AM")
      .sort(function (a, b) {
        var x = parseInt(a["Time"].split(":")[0]);
        var y = parseInt(b["Time"].split(":")[0]);
        return x < y ? -1 : x > y ? 1 : 0;
      });

    let pmArr = arr
      .filter((x) => x["Time"].split(" ")[1] == "PM")
      .sort(function (a, b) {
        var x = parseInt(a["Time"].split(":")[0]);
        var y = parseInt(b["Time"].split(":")[0]);
        return x < y ? -1 : x > y ? 1 : 0;
      });
    let arry = [...amArr, ...pmArr];

    return arry;
  };

  const removeAllData = async () => {
    setConfirmRemoveAllData(false);
    if (tasks.length > 0) {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      setFresh(true);
      setRemoveAllDataAnimation(true);

      setTimeout(() => {
        setRemoveAllDataAnimation(false);
      }, 5000);
    }
  };

  const storeData = async () => {
    if (!time && !about) {
      alert("Please fill all requirement");
      return;
    }
    const id = "id" + Math.floor(Math.random() * 10000000000);
    const realDate = date ? date : "";
    const data = {
      Time: time,
      Date: realDate,
      About: about,
      Id: id,
      Type: type.item ? type.item : "Default",
    };

    try {
      await AsyncStorage.setItem(id, JSON.stringify(data));
    } catch (e) {
      alert(e);
    }
  };

  const removeData = async (id) => {
    setFresh(true);
    await AsyncStorage.removeItem(`${id}`);
    setFailAnimation(true);
    setTimeout(() => {
      setFailAnimation(false);
    }, 5000);
  };

  const successRemoveData = async (id) => {
    setFresh(true);
    await AsyncStorage.removeItem(`${id}`);
    setSuccessAnimaiton(true);
    setTimeout(() => {
      setSuccessAnimaiton(false);
    }, 5000);
  };

  const startRotate = () => {
    setStopRotate(false);
    rotateValue.setValue(0),
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => startRotate());
  };

  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["45deg", "360deg"],
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTimeFormat(date);
    hideDatePicker();
  };

  const setTimeFormat = (argu) => {
    let hour = argu.getHours();
    let minute =
      argu.getMinutes() < 10 ? "0" + argu.getMinutes() : argu.getMinutes();
    let type = "AM";
    if (hour == 12) type = "PM";
    if (hour > 12) {
      hour -= 12;
      type = "PM";
    }
    if (hour == 0) {
      hour = 12;
    }

    setTime(`${hour}:${minute} ${type}`);

    if (selected) {
      let day = argu.getDate() < 10 ? "0" + argu.getDate() : argu.getDate();
      let month =
        argu.getMonth() + 1 < 10
          ? "0" + (argu.getMonth() + 1)
          : argu.getMonth();
      let year = argu.getFullYear();

      setDate(`${day}-${month}-${year}`);
    }
  };

  const checkNearBy = (hour) => {
    const time = new Date();
    const H = hour.split(":")[0];
    const realH = time.getHours();

    if (hour.split(" ")[1] == "PM") {
      if (realH == parseInt(H) + 12) {
        return true;
      } else {
        return false;
      }
    }

    if (realH == H) {
      return true;
    } else {
      return false;
    }
  };

  const handleMenstruationDate = async (argu) => {
    setMenstruationDatePicker(false);

    let monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let day = argu.getDate();
    let month = argu.getMonth() + 1;
    let year = argu.getFullYear();

    const currentDate = `${day}/${month < 10 ? "0" + month : month}/${year}`;

    if (month == 12) {
      month = 0;
      year += 1;
    }
    const expectDate = day + 28 - monthDays[month];

    const menstruationDate = `${expectDate}/${
      month + 1 < 10 ? "0" + (month + 1) : month + 1
    }/${year}`;

    const resultDate = { currentDate, menstruationDate };
    setCurrentMenstruationDate(currentDate);
    setUpMenstruationDate(menstruationDate);

    try {
      await AsyncStorage.setItem(
        "menstruationDate",
        JSON.stringify(resultDate)
      );
    } catch (e) {
      alert(e);
    }
    setFresh(true);
  };

  const getMenstruationDate = async () => {
    try {
      const date = await AsyncStorage.getItem("menstruationDate");
      if (date) {
        setCurrentMenstruationDate(JSON.parse(date)["currentDate"]);
        setUpMenstruationDate(JSON.parse(date)["menstruationDate"]);
      }
    } catch (e) {
      alert(e);
    }
  };

  const checkMenstruationDate = () => {
    if (upMenstruationDate) {
      const current = new Date();
      const date = current.getDate();
      const month = current.getMonth() + 1;
      const year = current.getFullYear();

      const upMenstDate = upMenstruationDate.split("/");

      if (upMenstDate[1] == month && upMenstDate[2] == year) {
        if (upMenstDate[0] - 3 < date && +upMenstDate[0] + 3 >= date) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return;
    }
  };

  const [loaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "DancingScript-Medium": require("../assets/fonts/DancingScript-Medium.ttf"),
    "DancingScript-Bold": require("../assets/fonts/DancingScript-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
          borderRadius: showMenu ? 50 : 0,
        },
      ]}
    >
      <Image style={styles.image} source={tesk_photo} />

      {
        // Lottie Arrow
      }
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.75,
              duration: 300,
              useNativeDriver: true,
            }).start();

            Animated.timing(offsetValue, {
              toValue: showMenu ? 0 : 250,
              duration: 300,
              useNativeDriver: true,
            }).start();
            setShowMenu(!showMenu);
          }}
        >
          <View style={styles.arrowLottieContainer}>
            <LottieView
              source={require("../assets/animation/arrow-right.json")}
              autoPlay
              loop
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginRight: 20,
            width: 100,
            height: 30,
            backgroundColor: "#f00000",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
          activeOpacity={0.7}
          onPress={() => {
            setConfirmRemoveAllData(true);
          }}
        >
          <Text
            style={{ fontSize: 12, fontFamily: "Roboto-Bold", color: "#fff" }}
          >
            Remove All
          </Text>
        </TouchableOpacity>
      </View>

      {
        // Task Container Card
      }
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Card style={styles.taskContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "60%",
                }}
              >
                <TouchableOpacity
                  style={styles.menstButton}
                  onPress={() => setMenstruationDatePicker(true)}
                >
                  <Text style={styles.menstBtnText}>Set Date</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={menstruationDatePicker}
                  mode="date"
                  onConfirm={handleMenstruationDate}
                  onCancel={() => setMenstruationDatePicker(false)}
                />
                <Text style={{ fontSize: 11, margin: 5, color: "#000" }}>
                  Last menstruation date {"-->"}
                  <Text style={{ color: "#f00000", fontWeight: "bold" }}>
                    {" "}
                    {currentMenstruationDate
                      ? currentMenstruationDate
                      : "--/--/----"}
                  </Text>
                </Text>
                <Text style={{ margin: 5, fontSize: 12, fontWeight: "700" }}>
                  Expect Next Menstruation Date
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#f00000",
                    fontFamily: "Roboto-Bold",
                    margin: 5,
                    transform: [{ translateY: -5 }],
                  }}
                >
                  {upMenstruationDate ? upMenstruationDate : "--/--/----"}
                </Text>
              </View>
              <View style={{ width: "40%" }}>
                {upMenstruationDate ? (
                  <LottieView
                    source={require("../assets/animation/menstruation.json")}
                    autoPlay
                    loop
                  />
                ) : (
                  <></>
                )}
              </View>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                top: 3,
                right: 3,
              }}
            >
              {checkMenstruationDate() ? (
                <LottieView
                  source={require("../assets/animation/menstruation-alert.json")}
                  autoPlay
                  loop
                  speed={0.8}
                />
              ) : (
                <></>
              )}
            </View>
          </Card>
          {tasks ? (
            tasks
              .filter((x) => x.Date.length > 1)
              .map((item, index) => {
                return (
                  <Card style={styles.taskContainer} key={index}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.time}>
                        {item.Time} | {item.Date ? item.Date : ""} | {item.Type}
                      </Text>
                      {item.Type == "Date" ? (
                        <LottieView
                          source={require("../assets/animation/star.json")}
                          autoPlay
                          loop
                          speed={0.9}
                          style={{
                            width: 40,
                            height: 40,
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </View>
                    <View style={styles.cardBody}>
                      <View style={styles.taskAndBtn}>
                        <Text style={styles.task}>{item.About}</Text>
                        <View style={styles.taskBotton}>
                          <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "#38ef7d" }]}
                            onPress={() => {
                              successRemoveData(item.Id);
                            }}
                          >
                            <Text
                              style={[styles.btnText, { color: "#414345" }]}
                            >
                              Done
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "#f00000" }]}
                            onPress={() => {
                              removeData(item.Id);
                            }}
                          >
                            <Text style={[styles.btnText, { color: "#fff" }]}>
                              Fail
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.lottieContainer}>
                        <Checkfile type={item.Type} />
                      </View>
                    </View>
                  </Card>
                );
              })
          ) : (
            <></>
          )}
          {tasks ? (
            tasks
              .filter((x) => x.Date.length == 0)
              .map((item, index) => {
                return (
                  <Card style={styles.taskContainer} key={index}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.time}>
                        {item.Time}
                        {item.Type == "Default" ? "" : " | " + item.Type}
                      </Text>
                      {checkNearBy(item.Time) ? (
                        <LottieView
                          source={require("../assets/animation/alert.json")}
                          autoPlay
                          loop
                          style={{
                            width: 40,
                            height: 40,
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </View>
                    <View style={styles.cardBody}>
                      <View style={styles.taskAndBtn}>
                        <Text style={styles.task}>{item.About}</Text>
                        <View style={styles.taskBotton}>
                          <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "#38ef7d" }]}
                          >
                            <Text
                              style={[styles.btnText, { color: "#414345" }]}
                              onPress={() => {
                                successRemoveData(item.Id);
                              }}
                            >
                              Done
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.btn, { backgroundColor: "#f00000" }]}
                            onPress={() => {
                              removeData(item.Id);
                            }}
                          >
                            <Text style={[styles.btnText, { color: "#fff" }]}>
                              Fail
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.lottieContainer}>
                        <Checkfile type={item.Type} />
                      </View>
                    </View>
                  </Card>
                );
              })
          ) : (
            <></>
          )}
        </ScrollView>
      </View>

      {
        // Bottom
      }
      <View style={styles.bottom}></View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.closeTouch}
        onPress={() => {
          startRotate();

          setTimeout(() => {
            setStopRotate("45deg");

            Animated.timing(modalScaleValue, {
              toValue: showModal ? 0 : 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
            setShowModal(!showModal);
          }, 1000);
        }}
      >
        <Animated.View
          style={[
            styles.closeContainer,
            {
              transform: [
                { rotate: stopRotate == "45deg" ? "45deg" : RotateData },
              ],
            },
          ]}
        >
          <Image source={close} style={styles.close} />
        </Animated.View>
      </TouchableOpacity>

      {
        // Modal
      }
      <Animated.View
        style={[
          styles.modalContainer,
          {
            display: showModal ? "flex" : "none",
            transform: [{ scale: modalScaleValue }],
          },
        ]}
      >
        <View style={styles.modal}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.modalHeader}>Add To Do List</Text>
            <Text style={{ fontSize: 11, color: "gray", marginTop: 4 }}>
              {time} | {date}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 12,
                marginRight: 10,
                color: "#000",
                fontFamily: "Roboto-Medium",
                marginTop: 2,
              }}
            >
              Note important date?
            </Text>
            <Checkbox
              style={styles.checkbox}
              value={selected}
              onValueChange={(val) => setSelected(val)}
            />
          </View>
          <Button title="Select Time" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={selected ? "datetime" : "time"}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <TextInput
            placeholder="Things to do"
            style={[styles.inputAbout, { paddingLeft: 12, marginTop: 20 }]}
            placeholderTextColor="#0000004c"
            multiline={true}
            onChangeText={(text) => setAbout(text)}
            value={about}
          />
          <Text style={styles.typeTitle}>
            Select type which is you need to do
          </Text>
          <View style={styles.selectBoxContainer}>
            <SelectBox
              label=""
              options={Files}
              value={type}
              onChange={(data) => {
                setType(data);
              }}
              hideInputFilter={true}
              optionContainerStyle={{ width: 200 }}
              optionsLabelStyle={{
                color: "#000",
                fontSize: 12,
                marginHorizontal: 10,
              }}
              selectedItemStyle={{
                color: "#000",
                width: 200,
                marginHorizontal: 10,
              }}
              style={{ height: 150 }}
            />
          </View>
          <View style={styles.modalBottom}>
            <TouchableOpacity
              style={styles.cancle}
              activeOpacity={0.5}
              onPress={() => {
                setTime("");
                setDate("");
                setAbout("");
                setType("Default");
                setSelected(false);

                Animated.timing(modalScaleValue, {
                  toValue: !showModal ? 1 : 0,
                  duration: 500,
                  useNativeDriver: true,
                }).start();
                setShowModal(!showModal);
              }}
            >
              <Text style={{ fontSize: 12, color: "#000" }}>Cancle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirm}
              activeOpacity={0.5}
              onPress={() => {
                storeData();

                setTime("");
                setDate("");
                setAbout("");
                setType("Default");
                setFresh(true);

                Animated.timing(modalScaleValue, {
                  toValue: !showModal ? 1 : 0,
                  duration: 500,
                  useNativeDriver: true,
                }).start();
                setShowModal(!showModal);
              }}
            >
              <Text style={{ fontSize: 12, color: "#fff" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {
        // Animation View
      }
      {failAnimation ? (
        <View style={styles.modalContainer}>
          <LottieView
            source={require("../assets/animation/try-again.json")}
            style={styles.lottieAnimation}
            autoPlay
            loop={false}
            speed={1}
          />
          <Text style={styles.failText}>Don't be sad.</Text>
          <Text style={styles.failText}>Next time you will be success</Text>
        </View>
      ) : (
        <></>
      )}
      {successAnimaiton ? (
        <View style={styles.modalContainer}>
          <LottieView
            source={require("../assets/animation/success.json")}
            style={styles.lottieAnimation}
            autoPlay
            loop
            speed={1}
          />
        </View>
      ) : (
        <></>
      )}
      {removeAllDataAnimation ? (
        <View style={styles.modalContainer}>
          <LottieView
            source={require("../assets/animation/pacman-loading.json")}
            style={styles.lottieAnimation}
            autoPlay
            loop
            speed={0.8}
          />
        </View>
      ) : (
        <></>
      )}
      {confirmRemoveAllData ? (
        <View style={styles.modalContainer}>
          <View
            style={{
              width: 300,
              height: 200,
              backgroundColor: "#f5f5f5",
              borderRadius: 30,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "DancingScript-Bold",
                marginTop: 40,
                alignSelf: "center",
              }}
            >
              Are you sure to remove all??
            </Text>
            <View
              style={{
                marginTop: 30,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 30,
                  borderWidth: 1,
                  borderColor: "#f00000",
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                  borderRadius: 15,
                }}
                onPress={() => {
                  setConfirmRemoveAllData(false);
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>Cancle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 30,
                  backgroundColor: "#38ef7d",
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 10,
                  borderRadius: 15,
                }}
                onPress={() => {
                  removeAllData();
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}

      {
        // Intro Animation
      }
      <Animated.View
        style={[
          styles.introcontainer,
          {
            display: introAnimation ? "none" : "flex",
          },
        ]}
      >
        <LottieView
          source={require("../assets/animation/intro-animation.json")}
          autoPlay
          loop
          speed={0.6}
          style={styles.introlottie}
        />
        <Text style={styles.introtext}>Hello Khin,</Text>
        <Text style={styles.introtext}>Good to see you again</Text>
        <Text style={styles.introtext}>{today()}</Text>
        <TouchableOpacity
          style={styles.introbtn}
          activeOpacity={0.5}
          onPress={() => {
            setIntroAnimation(true);
          }}
        >
          <Text style={styles.introbtnText}>GET START</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 230,
    resizeMode: "contain",
    marginTop: 4,
  },
  arrowLottieContainer: {
    width: 60,
    height: 60,
    transform: [{ translateY: -25 }],
  },
  bottom: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#2F80ED",
    justifyContent: "center",
    alignItems: "center",
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
    zIndex: -2,
  },
  closeContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    borderWidth: 10,
    borderColor: "#2F80ED",
  },
  closeTouch: {
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
  },
  close: {
    width: 20,
    height: 20,
    position: "absolute",
  },
  scrollContainer: {
    width: "100%",
    transform: [{ translateY: -20 }],
    height: 480,
    overflow: "hidden",
    backgroundColor: "#fff",
    paddingBottom: 30,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    zIndex: -1,
  },
  scroll: {
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#000000c6",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: 300,
    height: 480,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: { fontFamily: "Roboto-Bold", marginBottom: 20 },
  inputTime: {
    width: 260,
    height: 40,
    backgroundColor: "#f5f5f5",
    fontSize: 13,
    marginBottom: 10,
  },
  inputAbout: {
    width: 260,
    height: 50,
    backgroundColor: "#f5f5f5",
    fontSize: 13,
    marginBottom: 10,
    paddingVertical: 10,
  },
  typeTitle: {
    fontSize: 12,
    color: "#000",
    fontFamily: "Roboto-Medium",
    marginTop: 10,
  },
  selectBoxContainer: {
    width: 260,
    height: 150,
    overflow: "hidden",
  },
  modalBottom: {
    width: 260,
    height: 50,
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  confirm: {
    width: 80,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#38ef7d",
    borderRadius: 15,
  },
  cancle: {
    width: 80,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F00000",
    borderRadius: 15,
  },
  taskContainer: {
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
    width: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  btnText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  checkbox: {
    marginBottom: 8,
  },
  lottieAnimation: {
    width: 300,
    height: 300,
  },
  failText: {
    fontSize: 30,
    fontFamily: "DancingScript-Bold",
    color: "#fff",
    marginTop: 5,
  },
  introcontainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000e8",
    justifyContent: "center",
    alignItems: "center",
  },
  introlottie: { width: 300, height: 300 },
  introtext: {
    fontSize: 23,
    fontFamily: "DancingScript-Bold",
    color: "#fff",
    marginTop: 10,
  },
  introbtn: {
    width: 170,
    height: 50,
    marginTop: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2F80ED",
  },
  introbtnText: {
    fontSize: 15,
    fontFamily: "Roboto-Bold",
    color: "#000",
  },
  menstButton: {
    width: 70,
    height: 30,
    backgroundColor: "#2F80ED",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  menstBtnText: {
    color: "#fff",
    fontSize: 12,
  },
});
export default Home;
