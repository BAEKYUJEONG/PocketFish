import { IconButton, Title } from "react-native-paper";
import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Body, CardItem, Left, Thumbnail } from "native-base";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state: any) => state.user);
  const userObj = JSON.parse(user.user);
  return (
    <View style={styles.container}>
      <CardItem style={{ flex: 1 }}>
        <Left style={{ width: "100%", height: "100%" }}>
          <Thumbnail source={{ uri: userObj.profile_image }} />
          <Body style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {userObj.nickname}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", width: "100%", right: "-35%" }}
            >
              <IconButton
                icon="pencil"
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
                            setIsLoggedIn(false);
                            dispatch(SetUser(null));
                            console.log(state.user);
                            console.log;
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
