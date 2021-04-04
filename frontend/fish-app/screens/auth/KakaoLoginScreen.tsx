import * as React from "react";
import { WebView } from "react-native-webview";
import axios from "axios";
import "../../utils/storage";
import { getData, saveData } from "../../utils/storage";
import { kakaoApi } from "../../utils/axios";
import { SetUser } from "../../redux/user";
import { useDispatch } from "react-redux";

// const patchPostMessageJsCode = `(${String(function () {
//   const originalPostMessage = window.postMessage;
//   const patchedPostMessage = function (message, targetOrigin, transfer) {
//     originalPostMessage(message, targetOrigin, transfer);
//   };
//   patchedPostMessage.toString = function () {
//     return String(Object.hasOwnProperty).replace(
//       "hasOwnProperty",
//       "postMessage"
//     );
//   };
//   window.postMessage = patchedPostMessage;
// })})();`;

const runFirst = `
setTimeout(function () {
  const data = document.querySelector('body');
  // window.ReactNativeWebView.postMessage(data.innerText);
  window.ReactNativeWebView.postMessage(JSON.stringify(document));
}, 100)
`;

export default function KakaoLoginScreen(props) {
  const client_id = "fa18c792f29dde66fafdd337e808e8af";
  const redirect_uri = "https://j4a202.p.ssafy.io/images/meta.png";
  const { login } = props;
  const dispatch = useDispatch();
  return (
    <WebView
      style={{ flex: 0 }}
      source={{
        uri: `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`, // &prompt=login 매번 로그인
      }}
      injectedJavaScript={runFirst}
      onMessage={(event) => {
        const { data } = event.nativeEvent;
        const jsonObj = JSON.parse(data);
        const auth_code = jsonObj.location.search.split("=")[1];
        console.log(auth_code);
        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("client_id", client_id);
        params.append("redirect_uri", redirect_uri);
        params.append("code", auth_code);
        const postData = {
          grant_type: "authorization_code",
          client_id,
          redirect_uri,
          code: auth_code,
        };
        const postConfig = {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        };
        login();
        axios
          .post("https://kauth.kakao.com/oauth/token", params, postConfig)
          .then((result) => {
            saveData("auth", JSON.stringify(result.data));
            console.log(result.data);
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
            });
          })
          .catch((e) => console.error(e));

        // if (data.includes("404")) {
        //   console.log(404);
        // } else {
        //   console.log("not 404");
        // }
      }}

      // source={require("../../components/auth/KakaoLoginView.html")}
      // startInLoadingState
      // scalesPageToFit
      // javaScriptEnabled
      // style={{ flex: 1 }}
    />
  );
}
