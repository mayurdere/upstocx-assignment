import { Animated, StyleSheet, Text, Pressable, View } from "react-native";
import React, { useMemo, useRef, useState } from "react";

const PNLBottomSheet = ({ data, calculatedData }) => {
  const [expandBtmSheet, setExpandBtmSheet] = useState(false);
  const translateY = useRef(new Animated.Value(600)).current;

  const toggleBottomSheet = () => {
    Animated.timing(translateY, {
      toValue: expandBtmSheet ? 600 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setExpandBtmSheet(!expandBtmSheet);
  };

  const expand = useMemo(() => {
    return () => {
      setExpandBtmSheet(!expandBtmSheet);
    };
  }, [expandBtmSheet]);

  return (
    <Pressable style={styles.mainContainer} onPress={toggleBottomSheet}>
      {/*{expandBtmSheet &&*/}
      <Animated.View style={[{ transform: [{ translateY }] }]}>
        <View style={{ ...styles.alignData, paddingTop: 20 }}>
          <Text style={styles.title}>Current Value:</Text>
          <Text style={styles.subTitle}>
            ₹ {calculatedData?.currentValueTotal?.toFixed(2)}
          </Text>
          {/* ((data?.ltp - data.avgPrice)*data?.quantity).toFixed(2) */}
        </View>
        <View style={styles.alignData}>
          <Text style={styles.title}>Total Investment:</Text>
          <Text style={styles.subTitle}>
            ₹ {calculatedData?.investmentTotal?.toFixed(2)}
          </Text>
        </View>
        <View style={styles.alignData}>
          <Text style={styles.title}>Today's Profit & Loss:</Text>
          <Text style={styles.subTitle}>
            ₹ {calculatedData?.todaysPNL?.toFixed(2)}
          </Text>
        </View>
      </Animated.View>
      {/*}*/}
      <View style={{ ...styles.alignData, paddingVertical: 20 }}>
        <Text style={styles.title}>Profit & Loss:</Text>
        <Text style={styles.subTitle}>
          ₹{" "}
          {(
            calculatedData?.currentValueTotal - calculatedData?.investmentTotal
          )?.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
};

export default PNLBottomSheet;

const styles = StyleSheet.create({
  title: {
    fontWeight: 700,
    color: "#000000",
    fontSize: 15,
    paddingVertical: 5,
  },
  subTitle: {
    fontSize: 13,
    color: "#000000",
  },
  alignData: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
