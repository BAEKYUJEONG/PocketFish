import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, TouchableOpacity, Image } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { Text, View } from "../components/Themed";

import { authApi } from "../utils/axios";
import { getData } from "../utils/storage";

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("nickname");
  const [profileImage, setProfileImage] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      getData("auth").then((data) => {
        if (data) {
          setIsLoggedIn(true);
          authApi.kakaoUserInfo().then((response) => {
            const {
              properties: { nickname, profile_image },
            } = response;
            console.log(nickname, profile_image);
            setNickname(nickname);
            setProfileImage(profile_image);
          });
        } else {
          setIsLoggedIn(false);
          console.log("no data");
        }
      });
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return isLoggedIn ? (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={{
            uri: profileImage,
          }}
          style={{ width: 305, height: 159, resizeMode: "center" }}
        />
        <Text>닉네임 {nickname}</Text>
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
                    .then((result) => setIsLoggedIn(false))
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
  ) : (
    <Text>로그인해주세요.</Text>
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
