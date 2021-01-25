import axios from "axios";

export const ADD_BLOG_ACTION_CREATOR = "ADD_BLOG_ACTION_CREATOR";
export const LIST_BLOGS_ACTION_CREATOR = "LIST_BLOGS_ACTION_CREATOR";
export const DELETE_BLOG_ACTION_CREATOR = "DELETE_BLOG_ACTION_CREATOR";
export const EDIT_BLOG_ACTION_CREATOR = "EDIT_BLOG_ACTION_CREATOR";
export const SEARCH_BLOG_ACTION_CREATOR = "SEARCH_BLOG_ACTION_CREATOR";

// Defining the actions and what will be sent with each one
// Interactions within Redux, ont the frontend

export function ListBlogsAction(blogs) {
  return {
    payload: blogs,
    type: LIST_BLOGS_ACTION_CREATOR,
  };
}

export function AddBlogAction(blog) {
  return {
    payload: blog,
    type: ADD_BLOG_ACTION_CREATOR,
  };
}

export function EditBlogAction(blog) {
  return {
    payload: blog,
    type: EDIT_BLOG_ACTION_CREATOR,
  };
}

export function DeleteBlogAction(blog) {
  return {
    payload: blog,
    type: DELETE_BLOG_ACTION_CREATOR,
  };
}

export function SearchBlogAction(blog) {
  return {
    payload: blog,
    type: SEARCH_BLOG_ACTION_CREATOR,
  };
}

// Setting up ReduxThunk so send the information to the backend

// LIST BLOG

let user = localStorage.getItem("token");

export function ListBlogsActionThunk() {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/blog`, {
        headers: { Authorization: `Bearer ${user}` },
      })
      .then((res) => {
        // console.log("wowowowoww");
        // console.log(res);
        dispatch(ListBlogsAction(res.data));
      });
  };
}

// SEARCH BLOG
export function SearchBlogsActionThunk(input) {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/blog`, {
        headers: { Authorization: `Bearer ${user}` },
      })
      .then((res) => {
        // console.log("wowowowoww");
        // console.log(res);
        let filteredArray = res.data.filter(
          (blog) =>
            blog["headline"].toLowerCase().indexOf(input.toLowerCase()) > -1 ||
            blog["headline"].toUpperCase().indexOf(input.toUpperCase()) > -1 ||
            blog["content"].toLowerCase().indexOf(input.toLowerCase()) > -1 ||
            blog["content"].toUpperCase().indexOf(input.toUpperCase()) > -1,
        );
        dispatch(SearchBlogAction(filteredArray));
      });
  };
}

// ADD BLOG

export function AddBlogActionThunk(blog) {
  return (dispatch) => {
    console.log(blog, "in redux");
    axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/blog/`, blog, {
        headers: { Authorization: `Bearer ${user}` },
      })
      .then((res) => {
        console.log(res);
        dispatch(AddBlogAction(res.data));
      });
  };
}

// EDIT BLOG

export function EditBlogActionThunk(blogId, blog) {
  return (dispatch) => {
    console.log(blogId, blog, " edit in reduxxxxxx");
    axios
      .put(`${process.env.REACT_APP_API_SERVER}/api/blog/${blogId}`, blog, {
        headers: { Authorization: `Bearer ${user}` },
      })
      .then((res) => {
        console.log(res);
        dispatch(EditBlogAction(res.data));
      });
  };
}

// DELETE BLOG

export function DeleteBlogActionThunk(blogId) {
  return (dispatch) => {
    console.log(blogId, "del in reduxxxxx");
    axios
      .delete(`${process.env.REACT_APP_API_SERVER}/api/blog/${blogId}`, {
        headers: { Authorization: `Bearer ${user}` },
      })
      .then((res) => {
        dispatch(DeleteBlogAction(blogId));
      });
  };
}
