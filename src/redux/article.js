import sortingFun from "../public/sorting";

import article from "./temporaryState";

const articleStore = (state = sortingFun(article, "date"), action) => {
  switch (action.type) {
    case "CHANGE_ARTICLE":
      const temporaryIsC = state[action.dataNumber][action.dataName];
      const temporaryNum = state[action.dataNumber][action.dataName];
      Object.assign(temporaryIsC, temporaryIsC, { isChoose: action.dataValue });
      Object.assign(temporaryNum, temporaryNum, {
        number: temporaryNum.number + (1 * action.dataValue ? 1 : -1)
      });
      return Object.assign([], state);
    case "DELETE_ARTICLE":
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.articleId) {
          state.splice(i, 1);
        }
      }
      return Object.assign([], state);
    default:
      return state;
  }
};
export default articleStore;
