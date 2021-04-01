import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";

import { WebView } from "react-native-webview";

import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../utils/storage";
import { authApi } from "../utils/axios";
// import * as Kakao from "../utils/kakao";

export default function Home({ navigation }: { navigation: any }) {
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
  // function kakaoLogin() {
  //   console.log("kakaoLogin");
  //   Kakao.Auth.authorize({
  //     redirectUri: "{REDIRECT_URI}",
  //   });
  // }
  return isLoggedIn ? (
    <Text>로그인된 홈화면</Text>
  ) : (
    <View style={styles.container}>
      <View style={styles.headerView}></View>
      <View style={styles.contentView}>
        <Text style={styles.instructions}>
          포켓피쉬를 찾아주셔서 감사합니다.
        </Text>
        <Text style={styles.instructions}>
          카카오톡을 통해 로그인 해주세요.
        </Text>
      </View>
      <View style={styles.footerView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("KakaoLoginScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>카카오톡으로 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loginView: {
    flex: 1,
    marginVertical: 30,
    height: 1,
    width: "80%",
    alignItems: "flex-end",
  },
  instructions: {
    color: "#0476D9",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FEE500",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#1A1A1C",
  },
});
