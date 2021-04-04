import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";

import { WebView } from "react-native-webview";

import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../utils/storage";
import { kakaoApi } from "../utils/axios";
import KakaoLoginScreen from "./auth/KakaoLoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/user";

export default function Home({ navigation }: { navigation: any }) {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const [kakaoLoginBtn, setKakaoLoginBtn] = useState(false);
  useEffect(() => {
    getData("auth").then((data) => {
      if (data) {
        setIsLoggedIn(true);
        kakaoApi.kakaoUserInfo().then((response) => {
          const {
            id,
            properties: { nickname, profile_image },
          } = response;
          dispatch(
            SetUser(
              JSON.stringify({
                id,
                nickname,
                profile_image,
              })
            )
          );
          setIsInit(false);
        });
      } else {
        console.log("no data");
        setIsInit(false);
      }
    });
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getData("auth").then((data) => {
        // Do something when the screen is focused
        if (data) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
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
  return isInit ? (
    <></>
  ) : user.user ? (
    <TouchableOpacity onPress={() => console.log(user)}>
      <Text>로그인된 홈화면</Text>
    </TouchableOpacity>
  ) : kakaoLoginBtn ? (
    <KakaoLoginScreen
      login={() => {
        setKakaoLoginBtn(false);
        setIsLoggedIn(true);
      }}
    />
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
          onPress={() => setKakaoLoginBtn(true)}
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
