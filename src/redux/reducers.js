import { combineReducers } from 'redux';
import todos from './todos';
import loginStore from './login';
import articleStore from './article';
import languageStore from './languageStore';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  todos,
  loginStore,
  articleStore,
  languageStore,
  visibilityFilter,
});
