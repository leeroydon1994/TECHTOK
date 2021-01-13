import React from "react";
import { connect } from "react-redux";
// import { Card, CardTitle, CardText } from "reactstrap";
import "./BlogStyles.css";
import {
  AddBlogActionThunk,
  DeleteBlogActionThunk,
  ListBlogsActionThunk,
} from "../../Redux/Blog/actions";
import { Button } from "@material-ui/core";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

export class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      headline: "",
      content: "",
    };
  }

  componentDidMount() {
    this.props.listBlogConnect();
  }

  render() {
    return (
      <div>
        <h1 className="headblog">TechTok Blog</h1>
        <input
          type="text"
          className="blogsearch"
          placeholder="Serach by keyword"
        />
        <div>
          <form className="formcs">
            <div className="yourblog">
              <h1>Your Blog</h1>
            </div>

            {/* <label className="bloglabeltext1">Title:</label> */}
            <h3 className="blogsearchtext1">Searh result for </h3>
            <br />
            <div>
              <input
                className="headlineinput"
                type="text"
                onChange={this.onHeadlineChange}
                value={this.state.headline}
                placeholder="Headline"
              />
              <br />
              {/* <label className="bloglabeltext2">Content:</label> */}
              <br />
              <input
                className="contentinput"
                style={{ color: "black" }}
                type="text"
                onChange={this.onContentChange}
                value={this.state.content}
                placeholder="Content"
              />
            </div>
            <br />
            <div>
              <Button
                className="blogsubbut"
                color="primary"
                onClick={this.addBlog}
                size="medium"
                variant="contained"
              >
                POST
              </Button>
            </div>
            <div>
              {/* <Button
                className="viewbut"
                color="danger"
                onClick={this.toggle}
                size="medium"
                variant="contained"
                color="primary"
              >
                View Blogs
              </Button> */}
              <div className="blockcs"></div>
            </div>
          </form>
        </div>
        <br />

        <div className="blognote1">
          {this.props.blogs
            ? this.props.blogs.map((blog, i) => {
                return (
                  <div
                    key={i}
                    id={blog.id}
                    className="p-3 my-2 rounded bg-docs-transparent-grid"
                  >
                    <Toast>
                      <ToastHeader>
                        <div className="blogheadline">{blog.headline}</div>
                      </ToastHeader>
                      <ToastBody>
                        <div className="blogcontent">{blog.content}</div>
                      </ToastBody>
                      <Button
                        className="blogdelbut"
                        onClick={() => this.deleteblog(blog.id)}
                        color="primary"
                        size="medium"
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </Toast>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    );
  }

  deleteblog = (blogId) => {
    console.log("im here");
    // console.log(this.props.blogs);
    this.props.deleteBlogConnect(blogId);
    // console.log(blogId);
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  onHeadlineChange = (e) => {
    this.setState({
      headline: e.currentTarget.value,
    });
  };
  onContentChange = (e) => {
    this.setState({
      content: e.currentTarget.value,
    });
  };
  addBlog = () => {
    this.props.addBlogConnect({
      headline: this.state.headline,
      content: this.state.content,
    });

    this.setState({
      modal: false,
      headline: "",
      content: "",
    });
  };
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogStore.blogList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBlogConnect: (blog) => {
      console.log(blog);
      dispatch(AddBlogActionThunk(blog));
    },
    deleteBlogConnect: (blogId) => {
      dispatch(DeleteBlogActionThunk(blogId));
    },
    listBlogConnect: () => {
      dispatch(ListBlogsActionThunk());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);
