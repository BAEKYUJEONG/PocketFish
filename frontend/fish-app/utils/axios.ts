import axios, { AxiosInstance, AxiosResponse } from "axios";
import { saveData, getData } from "./storage";

// 인증 헤더
// const authHeader = function (): Record<string, string> {
//   const user: Record<string, any> = JSON.parse(
//     localStorage.getItem("user") || "{}"
//   );
//   if (Object.keys(user).length) {
//     const token = user.object.token;
//     return { Authorization: "Bearer " + token };
//   }
//   return {};
// };

const request: AxiosInstance = axios.create({
  baseURL: "https://j4a202.p.ssafy.io",
  // headers: authHeader(),
});

// 인증 Api
export const authApi: Record<string, any> = {
  async kakaoLogout(): Promise<void | AxiosResponse<any>> {
    const appData = await getData("auth");
    const jsonData = JSON.parse(appData);
    const { access_token } = jsonData;
    const response = await axios.post(
      "https://kapi.kakao.com/v1/user/logout",
      "",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    await saveData("auth", "");
    return response.data;
  },
  async kakaoUserInfo(): Promise<void | AxiosResponse<any>> {
    const appData = await getData("auth");
    const jsonData = JSON.parse(appData);
    const { access_token } = jsonData;
    const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  },
};

// 랭킹 Api
export const rankingApi: Record<string, any> = {
  async getRanking(fish_id: number): Promise<void | AxiosResponse<any>> {
    const response = await request.get(`ranking/${String(fish_id)}`);
    console.log(response);
    return response.data;
  },
};

// 보관함 Api
export const collectionApi: Record<string, any> = {
  async getCollection(user_id: number): Promise<void | AxiosResponse<any>> {
    const response = await request.get(`collection/user/${String(user_id)}`);
    console.log(response);
    return response.data;
  },
};

// 게시글 Api
export const collectionItemApi: Record<string, any> = {
  async getCollection(user_id: number): Promise<void | AxiosResponse<any>> {
    const response = await request.get(`collection/${String(user_id)}`);
    console.log(response);
    return response.data;
  },
}

// 분석 Api
export async function analysisApi(img: any) {
  console.log("api");
  //const dispatch=useDispatch();

  const result = await axios.post(
    `http://skeldtcan.iptime.org:5000`,
    JSON.stringify({ file: img }),
    { headers: { "Content-Type": "application/JSON" } }
  );
  // .then(
  //   (res)=>{
  //     console.log(res.data);
  //     return res.data;
  //   }
  // )
  // .catch((Error)=>{console.log(Error);});
  console.log(result.data);
  return result.data;
}

// 로그인 Api
// export const userApi: Record<string, any> = {
//   async login(user: Record<string, any>): Promise<void | AxiosResponse<any>> {
//     const loginAddress = "account/login";
//     // get 방식
//     // const config = {
//     //   params: user,
//     // };
//     // const response = await request.get(loginAddress, config);
//     // post 방식
//     const userData = user;
//     const response = await request.post(loginAddress, userData);
//     if (response.status === 200) {
//       localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     return response.data;
//   },
//   async signup(user: Record<string, any>): Promise<void | AxiosResponse<any>> {
//     const signupAddress = "account/signup";
//     const userData = user;
//     const response = await request.post(signupAddress, userData);
//     if (response.status === 201) {
//       localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     return response.data;
//   },
//   logout(): void {
//     localStorage.removeItem("user");
//   },
// };
