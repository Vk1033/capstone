import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { setCurrentUser } from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
};

export const USER_INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action = {} as AnyAction): UserState => {
  if (setCurrentUser.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }
  return state;
};
