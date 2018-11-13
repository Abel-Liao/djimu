import { combineReducers } from "redux";
import todos from "./todos";
import loginStore from "./login";
import headerStore from "./header";
import visibilityFilter from "./visibilityFilter";

export default combineReducers({
  todos,
  loginStore,
  headerStore,
  visibilityFilter
});
