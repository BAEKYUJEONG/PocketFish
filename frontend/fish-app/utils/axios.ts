import axios, { AxiosInstance, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage Test
const storeAuthData = async (value: string) => {
  try {
    await AsyncStorage.setItem("auth", value);
  } catch (e) {
    // saving error
    alert(e);
  }
};

const getAuthData = async () => {
  try {
    const value = await AsyncStorage.getItem("auth2");
    return value;
  } catch (e) {
    // error reading value
    alert(e);
  }
};

export const test = () => {
  storeAuthData("");
  const storeData = getAuthData().then((result) => {
    if (result) {
      console.log(result);
    } else {
      console.log("no data");
      console.log(result);
    }
  });
};

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
    const response = await axios.post(
      "https://kapi.kakao.com/v1/user/logout",
      "",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer NGskuYBP7qB-wptCyXKw49MXkJnYoBVWYh_RfQorDNMAAAF4i80kWA",
        },
      }
    );
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
