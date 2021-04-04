import { UserState, SetUserAction, SET_USER } from "./user.type";

export const userState: UserState = {
  user: null,
};

export const SetUser = (user: string | null): SetUserAction => {
  return {
    type: SET_USER,
    user: user,
  };
};

export const userReducer = (state = userState, action: any): UserState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
