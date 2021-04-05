import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../utils/storage";
import { kakaoApi } from "../utils/axios";
import KakaoLoginScreen from "./auth/KakaoLoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/user";
import LoadingScreen from "./common/LoadingScreen";
import MainScreen from "./auth/MainScreen";
import MainLoginScreen from "./auth/MainLoginScreen";

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
        kakaoApi
          .kakaoUserInfo()
          .then((response) => {
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
          })
          .catch((e) => {
            console.log(e);
            setIsInit(false);
          });
      } else {
        console.log("no data");
        setIsInit(false);
      }
    });
  }, []);
  useFocusEffect(
    useCallback(() => {
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
  return isInit ? (
    <LoadingScreen />
  ) : user.user ? (
    <MainScreen />
  ) : (
    <MainLoginScreen />
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
