import * as React from "react";

import { WebView } from "react-native-webview";

export default function KakaoLoginScreen() {
  return (
    <WebView
      source={{
        uri:
          "https://kauth.kakao.com/oauth/authorize?client_id=8986b62bc46923845b095b75dbe1302c&redirect_uri=https://j4a202.p.ssafy.io/images/meta.png&response_type=code",
      }}

      // source={require("../../components/auth/KakaoLoginView.html")}
      // startInLoadingState
      // scalesPageToFit
      // javaScriptEnabled
      // style={{ flex: 1 }}
    />
  );
}
