import * as React from "react";

import { WebView } from "react-native-webview";

const patchPostMessageJsCode = `(${String(function () {
  const originalPostMessage = window.postMessage;
  const patchedPostMessage = function (message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function () {
    return String(Object.hasOwnProperty).replace(
      "hasOwnProperty",
      "postMessage"
    );
  };
  window.postMessage = patchedPostMessage;
})})();`;

const runFirst = `
setTimeout(function () {
  const data = document.querySelector('body');
  window.ReactNativeWebView.postMessage(data.innerText);
}, 100)
`;

export default function KakaoLoginScreen({ navigation }: { navigation: any }) {
  let webView = null;
  return (
    <WebView
      source={{
        uri:
          "https://kauth.kakao.com/oauth/authorize?client_id=8986b62bc46923845b095b75dbe1302c&redirect_uri=https://j4a202.p.ssafy.io/images/meta.png&response_type=code",
      }}
      injectedJavaScript={runFirst}
      onMessage={(event) => {
        const { data } = event.nativeEvent;
        if (data.includes("404")) {
          console.log(404);
          navigation.navigate("Profile");
        } else {
          console.log("not 404");
        }
      }}

      // source={require("../../components/auth/KakaoLoginView.html")}
      // startInLoadingState
      // scalesPageToFit
      // javaScriptEnabled
      // style={{ flex: 1 }}
    />
  );
}
