import * as React from "react";
import { WebView } from "react-native-webview";
import axios from "axios";
import "../../utils/storage";
import { getData, saveData } from "../../utils/storage";
import { kakaoApi } from "../../utils/axios";
import { SetUser } from "../../redux/user";
import { useDispatch } from "react-redux";

const injectedJS = `
setTimeout(function () {
  const data = document.querySelector('body');
  window.ReactNativeWebView.postMessage(JSON.stringify(document));
}, 100)
`;

export default function KakaoLoginScreen({ close }: { close: any }) {
  const client_id = "fa18c792f29dde66fafdd337e808e8af";
  const redirect_uri = "https://j4a202.p.ssafy.io/images/meta.png";
  const dispatch = useDispatch();
  return (
    <WebView
      style={{ flex: 0 }}
      source={{
        uri: `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`, // &prompt=login 매번 로그인
      }}
      injectedJavaScript={injectedJS}
      onMessage={(event) => {
        const { data } = event.nativeEvent;
        const jsonObj = JSON.parse(data);
        const auth_code = jsonObj.location.search.split("=")[1];
        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("client_id", client_id);
        params.append("redirect_uri", redirect_uri);
        params.append("code", auth_code);
        const postConfig = {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        };
        axios
          .post("https://kauth.kakao.com/oauth/token", params, postConfig)
          .then((result) => {
            saveData("auth", JSON.stringify(result.data));
            console.log(result.data);
            kakaoApi.kakaoUserInfo().then((response: any) => {
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
            close();
          })
          .catch((e) => {
            console.error(e);
            close();
          });
      }}
    />
  );
}
