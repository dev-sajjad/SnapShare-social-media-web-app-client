import { combineReducers } from "redux";

import { posts } from "./posts";
import  auth  from "./auth";

// global reducers for the whole app
export default combineReducers({
  posts, auth
});
