import { IconButton, Title } from "react-native-paper";
import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Body, CardItem, Left, Thumbnail } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { kakaoApi, userApi } from "../../utils/axios";
import { SetUser } from "../../redux/user";
import { saveData } from "../../utils/storage";

export default function Profile() {
  const user = useSelector((state: any) => state.user);
  const userObj = JSON.parse(user.user);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <CardItem style={{ flex: 1 }}>
        <Left style={{ width: "100%", height: "100%" }}>
          <Thumbnail large source={{ uri: userObj.profile_image }} />
          <Body style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{ paddingLeft: 10, fontSize: 25, fontWeight: "bold" }}
              >
                {userObj.nickname}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", width: "100%", right: "-27.5%" }}
            >
              <IconButton
                icon="logout"
                style={{ marginLeft: "15%" }}
                color="black"
                size={20}
                onPress={() => {
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
                            saveData("auth", "");
                            dispatch(SetUser(null));
                          })
                          .catch((e) => console.error(e));
                      },
                    },
                  ]);
                }}
              />
              <IconButton
                icon="delete"
                color="black"
                size={20}
                onPress={() => {
                  Alert.alert("계정 탈퇴", "진짜 탈퇴하시겠습니까?", [
                    {
                      text: "아니오",
                      onPress: () => console.log("no"),
                      style: "cancel",
                    },
                    {
                      text: "예",
                      onPress: () => {
                        userApi.signout(userObj.id).then((result) => {
                          kakaoApi
                            .kakaoSignout()
                            .then((result) => {
                              saveData("auth", "");
                              dispatch(SetUser(null));
                            })
                            .catch((e) => console.error(e));
                        });
                      },
                    },
                  ]);
                }}
              />
            </View>
          </Body>
        </Left>
      </CardItem>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 13,
  },
});
