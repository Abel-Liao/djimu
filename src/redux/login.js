let uesrInfo = {
  login: false,
  register: false,
  userName: null,
  logout: true
};
const loginStore = (state = uesrInfo, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      console.log(state.login);
      return Object.assign({}, state, { login: !state.login });
    case "USER_NAME":
      sessionStorage.setItem("userName", action.data);
      return Object.assign({}, state, { userName: action.data });
    default:
      return state;
  }
};
export default loginStore;
