let uesrInfo = {
  login: false,
  register: false,
  logout: true
};
const loginStore = (state = uesrInfo, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return Object.assign({}, state, (state.login = !state.login));
    default:
      return state;
  }
};
export default loginStore;
