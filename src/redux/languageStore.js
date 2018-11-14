import languages from "../public/language";

// 获取浏览器语言
const lang = navigator.language || navigator.userLanguage;
const headerState = {
  language: languages[lang]
};
const languageObj = {
  English: "en-US",
  中文: "zh-CN"
};
const languageStore = (state = headerState, action) => {
  switch (action.type) {
    case "CHANGE_LAN":
      return Object.assign({}, state, {
        language: languages[languageObj[action.language]]
      });
    default:
      return state;
  }
};
export default languageStore;
