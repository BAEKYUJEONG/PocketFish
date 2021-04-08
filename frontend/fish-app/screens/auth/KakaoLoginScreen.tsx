import * as React from "react";
import { WebView } from "react-native-webview";
import axios from "axios";
import "../../utils/storage";
import { saveData } from "../../utils/storage";
import { kakaoApi, userApi } from "../../utils/axios";
import { SetUser } from "../../redux/user";
import { useDispatch } from "react-redux";
import { useState } from "react";

const injectedJS = `
setTimeout(function () {
  const data = document.querySelector('body');
  window.ReactNativeWebView.postMessage(JSON.stringify(document));
}, 100)
`;

export default function KakaoLoginScreen({ close }: { close: any }) {
  const client_id = "fa18c792f29dde66fafdd337e808e8af";
  const redirect_uri = "https://j4a202.p.ssafy.io/images/meta.png";
  const [flex, setFlex] = useState(0);
  const dispatch = useDispatch();
  return (
    <>
      <WebView
        style={{ flex }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`, // &prompt=login 매번 로그인
        }}
        injectedJavaScript={injectedJS}
        onLoad={() => setFlex(0)}
        onMessage={(event) => {
          const { data } = event.nativeEvent;
          // console.log("data");
          // console.log(data);
          const jsonObj = JSON.parse(data);
          // console.log("jsonObj");
          // console.log(jsonObj);
          // console.log(jsonObj.location.origin);
          if (jsonObj.location.origin == "https://j4a202.p.ssafy.io") {
            const auth_code = jsonObj.location.search.split("=")[1];
            const params = new URLSearchParams();
            params.append("grant_type", "authorization_code");
            params.append("client_id", client_id);
            params.append("redirect_uri", redirect_uri);
            params.append("code", auth_code);
            const postConfig = {
              headers: {
                "Content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            };
            axios
              .post("https://kauth.kakao.com/oauth/token", params, postConfig)
              .then((result) => {
                saveData("auth", JSON.stringify(result.data));
                console.log(result.data);
                const { access_token } = result.data;
                kakaoApi.kakaoUserInfo().then((response: any) => {
                  const {
                    id,
                    properties: { nickname, profile_image },
                  } = response;
                  userApi.checkUser(id).then((result: any) => {
                    console.log(result.data);
                    if (!result.status) {
                      const userData = {
                        id,
                        nickname,
                        picture: profile_image,
                      };
                      userApi
                        .signup(userData)
                        .then((res: any) => console.log(res))
                        .catch((e: any) => console.log(e));
                    } else {
                      console.log("userApi.profile_update");
                      userApi.profile_update(id, profile_image);
                    }
                  });
                  dispatch(
                    SetUser(
                      JSON.stringify({
                        id,
                        nickname,
                        profile_image,
                        access_token,
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
          } else {
            setFlex(1);
          }
        }}
      />
    </>
  );
}
