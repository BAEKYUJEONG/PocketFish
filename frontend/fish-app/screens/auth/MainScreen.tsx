import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { View, Text } from "../../components/Themed";

export default function MainScreen() {
  const user = useSelector((state) => state.user);
  const userObj = JSON.parse(user.user);
  return (
    <View style={styles.container}>
      <Text>로그인 홈 화면!</Text>
      <Text>{userObj.access_token}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
