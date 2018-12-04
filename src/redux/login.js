let uesrInfo = {
  login: false,
  register: false,
  userName: null,
  logout: true
};
const loginStore = (state = uesrInfo, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return Object.assign({}, state, (state.login = !state.login));
    case "USER_NAME":
      sessionStorage.setItem("userName", action.data);
      return Object.assign({}, state, (state.userName = action.data));
    default:
      return state;
  }
};
export default loginStore;
