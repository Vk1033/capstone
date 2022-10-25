import { createSelector } from "reselect";

const selectCategory = (state) => state.categories;

export const selectCategories = createSelector([selectCategory], (category) => category.categories);

export const selectCategoriesMap = createSelector([selectCategories], (categories) => {
  return categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
});
