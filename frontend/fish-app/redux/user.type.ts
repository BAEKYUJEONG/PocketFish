export interface UserState {
  user: string | null; //카메라로 촬영한 사진
}

export const SET_USER = "SET_USER";

export interface SetUserAction {
  type: typeof SET_USER;
  user: string | null;
}
