import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

export default function Home() {
  function loginWithKakao() {
    alert("힝 속았지");
  }
  return (
    <View style={styles.container}>
      <View style={styles.loginView} />
      <a id="custom-login-btn" onClick={loginWithKakao}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="222"
        />
      </a>
      <p id="token-result"></p>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
