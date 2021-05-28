import {
  ADD_BLOG_ACTION_CREATOR,
  SEARCH_BLOG_ACTION_CREATOR,
  LIST_BLOGS_ACTION_CREATOR,
  DELETE_BLOG_ACTION_CREATOR,
  EDIT_BLOG_ACTION_CREATOR,
} from "./actions";

let inititalState = {
  blogList: [],
};

export function blogReducer(state = inititalState, action) {
  switch (action.type) {
    case LIST_BLOGS_ACTION_CREATOR:
      return {
        blogList: action.payload,
      };
    case SEARCH_BLOG_ACTION_CREATOR:
      return {
        blogList: action.payload,
      };
    case ADD_BLOG_ACTION_CREATOR:
      let array = [...state.blogList];
      array.push(action.payload);
      return {
        blogList: array,
      };
    case DELETE_BLOG_ACTION_CREATOR:
      let array2 = state.blogList.filter((blog) => blog.id !== action.payload);
      return {
        blogList: array2,
      };
    case EDIT_BLOG_ACTION_CREATOR:
      return {
        ...state,
        done: action.payload,
      };
    default:
      return state;
  }
}
