import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import KakaoLoginScreen from "../auth/KakaoLoginScreen";

export default function MainLoginScreen() {
  const [kakaoLoginBtn, setKakaoLoginBtn] = useState(false);
  return kakaoLoginBtn ? (
    <KakaoLoginScreen
      close={() => {
        setKakaoLoginBtn(false);
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
