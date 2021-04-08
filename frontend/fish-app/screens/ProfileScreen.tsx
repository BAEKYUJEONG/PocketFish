import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, TouchableOpacity, Image } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { Text, View } from "../components/Themed";

import { kakaoApi, userApi } from "../utils/axios";
import { getData } from "../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/user";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const user = useSelector((state) => state.user);
  const userObj = JSON.parse(user.user);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return user.user ? (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={{
            uri: userObj.profile_image,
          }}
          style={{ width: 305, height: 159, resizeMode: "center" }}
        />
        <Text>닉네임 {userObj.nickname}</Text>
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
                  kakaoApi
                    .kakaoLogout()
                    .then((result) => {
                      setIsLoggedIn(false);
                      dispatch(SetUser(null));
                      console.log(state.user);
                      console.log;
                    })
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
                onPress: () => {
                  kakaoApi
                    .kakaoSignout()
                    .then((result) => {
                      setIsLoggedIn(false);
                      dispatch(SetUser(null));
                      console.log(state.user);
                      console.log;
                    })
                    .catch((e) => console.error(e));
                },
              },
            ])
          }
        >
          <Text style={{ color: "red" }}>계정 탈퇴</Text>
        </TouchableOpacity>
        {/* 회원가입 버튼 */}
        {/* <TouchableOpacity
          onPress={() => {
            console.log("clicked");
            userApi.signup();
          }}
        >
          <Text>회원가입</Text>
        </TouchableOpacity> */}
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
