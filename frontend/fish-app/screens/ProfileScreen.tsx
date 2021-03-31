import * as React from "react";
import { Alert, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Text, View } from "../components/Themed";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>이상해씨</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.profile}>
        <Image
          source={{
            uri:
              "https://j4a202.p.ssafy.io/images/1_202103310616803_strange2.png",
          }}
          style={{ width: 305, height: 159, resizeMode: "center" }}
        />
        <Text>닉네임 이상해씨</Text>
        <Text>도감기록 12회</Text>
      </View>
      <TouchableOpacity
        style={styles.footer}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    marginTop: 5,
    fontSize: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
  },
  profile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
});
