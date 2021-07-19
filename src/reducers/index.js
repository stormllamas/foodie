import { combineReducers } from 'redux';
import siteConfig from './siteConfig';
import foodies from './foodies';

export default combineReducers({
  siteConfig,
  foodies,
});