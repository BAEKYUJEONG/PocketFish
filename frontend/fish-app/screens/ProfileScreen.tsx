import * as React from "react";
import { Alert, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Text, View } from "../components/Themed";

import { test, authApi } from "../utils/axios";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={{
            uri: "https://j4a202.p.ssafy.io/images/collection/strange.png",
          }}
          style={{ width: 305, height: 159, resizeMode: "center" }}
        />
        <Text>닉네임 이상해씨</Text>
        <Text>도감기록 12회</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
              {
                text: "아니오",
                onPress: () => console.log("no"),
                style: "cancel",
              },
              {
                text: "예",
                onPress: () => {
                  authApi
                    .kakaoLogout()
                    .then((result) => console.log(result))
                    .catch((e) => console.error(e));
                },
              },
            ])
          }
        >
          <Text style={{ color: "blue" }}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("계정 탈퇴", "진짜 탈퇴하시겠습니까?", [
              {
                text: "아니오",
                onPress: () => console.log("no"),
                style: "cancel",
              },
              {
                text: "예",
                onPress: () =>
                  Alert.alert("힝 속았지?", "응 탈퇴 못해 그런 기능 없어~"),
              },
            ])
          }
        >
          <Text style={{ color: "red" }}>계정 탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  profile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
