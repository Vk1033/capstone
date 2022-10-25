import CATEGORY_ACTION_TYPES from "./category.types";

export const CATEGROY_INITIAL_STATE = {
  categories: [],
};

export const categoriesReducer = (state = CATEGROY_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
