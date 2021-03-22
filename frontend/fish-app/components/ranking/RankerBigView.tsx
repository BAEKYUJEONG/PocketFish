import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "../Themed";

export default function RankerBigView(props: any) {
  const { rank } = props;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        rank === "1"
          ? styles.gold
          : rank === "2"
          ? styles.silver
          : styles.bronze,
      ]}
      onPress={() => alert("랭커 페이지 이동")}
    >
      <Text>{rank}등입니다.</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    borderRadius: 5,
    marginBottom: 5,
    padding: 5,
  },
  gold: {
    backgroundColor: "#C9B037",
  },
  silver: {
    backgroundColor: "#D7D7D7",
  },
  bronze: {
    backgroundColor: "#AD8A56",
  },
});
