import React from "react";
import { connect } from "react-redux";
import { ListBlogsActionThunk } from "../../Redux/Blog/actions";

export class ViewBlogs extends React.Component {
  render() {
    console.log(this.props.blogs);
    console.log(this.props.blogs && this.props.blogs.length > 0);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="profileDiv col-4">
            <div>
              <h1>BLOG</h1>
            </div>
          </div>
          <div className="col-8">
            {this.props.blogs
              ? this.props.blogs.map((blog, i) => {
                  return (
                    <div key={i} id={blog.id}>
                      <p>{blog[0].headline}</p>
                      <p>{blog[0].content}</p>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogStore.blogList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadBlogsConnect: (blogs) => {
      dispatch(ListBlogsActionThunk(blogs));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBlogs);
