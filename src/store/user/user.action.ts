import { User } from "firebase/auth";
import { USER_ACTION_TYPES } from "./user.types";
import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";

type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, any>;

export const setCurrentUser = withMatcher(
  (user: User | null): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);
