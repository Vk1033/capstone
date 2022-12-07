import { all, call } from "typed-redux-saga";

import { categoriesSaga } from "./categories/category.saga";

export default function* rootSaga() {
  yield all([call(categoriesSaga)]);
}
