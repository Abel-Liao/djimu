// 获取浏览器语言
const lang = navigator.language || navigator.userLanguage;
const headerState = {
  language: lang
};
const languageObj = {
  English: "en-US",
  中文: "zh-CN"
};
const headerStore = (state = headerState, action) => {
  console.log(action.language);
  switch (action.type) {
    case "CHANGE_LAN":
      return Object.assign(
        {},
        state,
        (state.language = languageObj[action.language])
      );
    default:
      return state;
  }
};
export default headerStore;
