import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "../../components/Themed";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text>로그인 홈 화면!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
