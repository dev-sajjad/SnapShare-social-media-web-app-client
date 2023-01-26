import { combineReducers } from "redux";
import { posts } from "./posts";

// global reducers for the whole app
export default combineReducers({
  posts,
});
