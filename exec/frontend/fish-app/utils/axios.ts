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

// 유저 Api
export const userApi: Record<string, any> = {
  async signup(
    userData: Record<string, any>
  ): Promise<void | AxiosResponse<any>> {
    const response = await request.post("/user/", userData);
    return response.data;
  },
  async checkUser(id: number): Promise<void | AxiosResponse<any>> {
    const response = await request.get(`/user/${id}`);
    return response.data;
  },
  async getUser(id: number): Promise<void | AxiosResponse<any>> {
    const response = await request.get(`/user/${id}`);
    return response.data;
  },
  async signout(id: number): Promise<void | AxiosResponse<any>> {
    const appData = await getData("auth");
    const jsonData = JSON.parse(appData);
    const { access_token } = jsonData;
    try {
      const response = await request.delete(`/user/${id}`, {
        data: access_token,
        headers: { "Content-Type": "text/plain" },
      });
      console.log("signout");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("signout error");
      console.log(error);
    }
  },
  async profile_update(
    id: number,
    picture: string
  ): Promise<void | AxiosResponse<any>> {
    const appData = await getData("auth");
    const jsonData = JSON.parse(appData);
    const { access_token } = jsonData;
    const body = {
      accessToken: access_token,
      picture,
    };
    try {
      const response = await request.post(`/user/picture/${id}`, body);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

// 카카오 인증 Api
export const kakaoApi: Record<string, any> = {
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
    return response.data;
  },
  async kakaoSignout(): Promise<void | AxiosResponse<any>> {
    const appData = await getData("auth");
    const jsonData = JSON.parse(appData);
    const { access_token } = jsonData;
    const response = await axios.post(
      "https://kapi.kakao.com/v1/user/unlink",
      "",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
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
  async validateToken(): Promise<boolean> {
    const appData = await getData("auth");
    const jsonData = JSON.parse(appData);
    const { access_token } = jsonData;
    try {
      const response = await axios.get(
        "https://kapi.kakao.com/v1/user/access_token_info",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log("token validation ok");
      return true;
    } catch (error) {
      console.log("token validation fail");
      return false;
    }
  },
};

// 랭킹 Api
export const rankingApi: Record<string, any> = {
  async getRanking(fish_id: number): Promise<void | AxiosResponse<any>> {
    const response = await request.get(`ranking/${String(fish_id)}`);
    return response.data;
  },
};

// 보관함 Api
export const collectionApi: Record<string, any> = {
  async getCollection(user_id: number): Promise<void | AxiosResponse<any>> {
    // const appData = await getData("auth");
    // const jsonData = JSON.parse(appData);
    // const { access_token } = jsonData;
    // console.log("access_token");
    // console.log(access_token);
    const response = await request.post(
      `collection/user/${String(user_id)}`,
      {}
    );
    return response.data;
  },
};

// 게시글 Api
export const collectionItemApi: Record<string, any> = {
  async getCollectionItem(
    collection_id: number
  ): Promise<void | AxiosResponse<any>> {
    const response = await request.get(`collection/${String(collection_id)}`);
    return response.data;
  },
  async deleteItem(user: any): Promise<void | AxiosResponse<any>> {
    let box = { user_token: user.user_token, user_id: user.user_id };
    // console.log(box);
    // console.log(user.item_id);
    const response = await request.delete(`collection/${user.item_id}`, {
      data: box,
    });
    // console.log(
    //   "-----------------------------" + JSON.stringify(response.data)
    // );
    return response.data;
  },
  async updateItem(user: any): Promise<void | AxiosResponse<any>> {
    let box = {
      user_token: user.user_token,
      user_id: user.user_id,
      length: user.length,
      location: user.location,
      fish_id: user.fish_id,
      memo: user.memo,
      bait: user.bait,
      fishing_info: user.fishing_info,
      fish_image: user.fish_image,
    };
    // console.log(box);
    // console.log(user.collectionId);
    const response = await request.put(`collection/${user.collectionId}`, box);
    return response.data;
  },
};

// Add Api
export const AddApi: Record<string, any> = {
  async getAnalysis(img: any): Promise<void | AxiosResponse<any>> {
    console.log("analysis api");
    console.log(img);
    const response = await axios.post(
      `https://j4a202.p.ssafy.io/ai/`,
      JSON.stringify({ file: img }),
      { headers: { "Content-Type": "application/JSON" } }
    );
    //const response = await request.post(`ai`,JSON.stringify({file:img}),{headers: {'Content-Type': 'application/JSON'}});
    return response.data;
  },
  async getFishInformation(num: number): Promise<void | AxiosResponse<any>> {
    console.log("fish information api");
    const response = await request.get(`fish/${String(num)}`);
    return response.data;
  },
  async saveFish(post: any): Promise<void | AxiosResponse<any>> {
    console.log("fish save api");
    //post.fish_image=post.fish_image.substring(0,100);
    //console.log(post);

    let box = new FormData();
    box.append("user_id", post.user_id);
    box.append("length", post.length);
    box.append("location", post.location);
    box.append("fish_id", post.fish_id);
    box.append("memo", post.memo);
    box.append("bait", post.bait);
    box.append("fishing_info", post.fishing_info);
    box.append("fish_image", post.fish_image);
    box.append("user_token", post.user_token);
    //console.log("-------------"+post.fish_image)
    console.log(post.user_id);
    console.log(post.user_token);
    const response = await request.post(`collection`, box, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    //console.log("------------------"+JSON.stringify(response.data));
    return response.data;
  },
};

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
