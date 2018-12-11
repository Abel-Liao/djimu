import sortingFun from "../public/sorting";

import article from "./temporaryState";

const articleStore = (state = sortingFun(article, "date"), action) => {
  switch (action.type) {
    case "CHANGE_ARTICLE":
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.dataNumber) {
          const temporaryIsC = state[i][action.dataName];
          const temporaryNum = state[i][action.dataName];
          Object.assign(temporaryIsC, temporaryIsC, {
            isChoose: !state[i][action.dataName].isChoose
          });
          Object.assign(temporaryNum, temporaryNum, {
            number:
              temporaryNum.number +
              (1 * state[i][action.dataName].isChoose ? 1 : -1)
          });
        }
      }
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
