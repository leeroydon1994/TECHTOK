import {
  ADD_BLOG_ACTION_CREATOR,
  SEARCH_BLOG_ACTION_CREATOR,
  LIST_BLOGS_ACTION_CREATOR,
  DELETE_BLOG_ACTION_CREATOR,
  EDIT_BLOG_ACTION_CREATOR,
} from "./actions";

// let user = localStorage.getItem("token");

// let blogList = [];

// axios
//   .get(`${process.env.REACT_APP_API_SERVER}/api/blog`, {
//     headers: { Authorization: `Bearer ${user}` },
//   })
//   .then((data) => {
//     console.log("hello");
//     console.log(data);

//     data.data.map((item) => {
//       blogList.push(item);
//     });
//   });

let inititalState = {
  blogList: [],
};

// console.log(inititalState);

export function blogReducer(state = inititalState, action) {
  // console.log(action);
  switch (action.type) {
    case LIST_BLOGS_ACTION_CREATOR:
      console.log(action.payload, "list");
      return {
        blogList: action.payload,
      };
    case SEARCH_BLOG_ACTION_CREATOR:
      console.log(state.blogList, "search-list");
      return {
        blogList: action.payload,
      };
    case ADD_BLOG_ACTION_CREATOR:
      let array = [...state.blogList];
      array.push(action.payload);
      console.log(array, "ARRAY");
      console.log(action.payload, "ADD, PAYLOAD");
      return {
        blogList: array,
      };
    case DELETE_BLOG_ACTION_CREATOR:
      // console.log(state.blogList);
      // console.log(action.payload);
      let array2 = state.blogList.filter((blog) => blog.id !== action.payload);
      // console.log(array2);
      return {
        blogList: array2,
      };
    case EDIT_BLOG_ACTION_CREATOR:
      console.log("hihihihihihihih");
      console.log(state);
      return {
        ...state,
        done: action.payload,
      };
    default:
      return state;
  }
}
