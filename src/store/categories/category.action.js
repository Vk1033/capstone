import CATEGORY_ACTION_TYPES from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategoriesMAP = (categoriesMap) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesMap);
