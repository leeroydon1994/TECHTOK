import React from "react";
import { connect } from "react-redux";
// import { Card, CardTitle, CardText } from "reactstrap";
import "./BlogStyles.css";
import {
  AddBlogActionThunk,
  DeleteBlogActionThunk,
  ListBlogsActionThunk,
  SearchBlogsActionThunk,
  // EditBlogActionThunk,
} from "../../Redux/Blog/actions";
import { Button } from "@material-ui/core";
import { Input, Toast, ToastBody, ToastHeader } from "reactstrap";
import Modal from "./Modal";

export class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      content: "",
      show: {},
      searchbarInput: "",
      blogSearchText: "Content",
    };

    this.handleSearchbarChange = this.handleSearchbarChange.bind(this);
  }

  showModal = (blogId) => {
    let newShow = this.state.show;
    // ****
    newShow[blogId] = !newShow[blogId];
    // ***
    this.setState({
      ...this.state,
      show: newShow,
    });
  };

  componentDidMount() {
    this.props.listBlogConnect();
  }

  componentDidUpdate(previousProps) {
    // this.props.blogs
    if (previousProps.blogs !== this.props.blogs) {
      console.log("ruuning");
      const array1 = this.props.blogs.map((blog, i) => {
        return blog.id;
      });
      console.log(array1);

      const reducer = (object, currentValue) => {
        object[currentValue] = false;
        return object;
      };
      const object1 = array1.reduce(reducer, {});
      const object2 = { ...object1, ...this.state.show };
      console.log(object2);
      this.setState({ ...this.state, show: object2 });
    }
    // from reducer + mapStateToProps
    if (
      previousProps.done !== this.props.done
      // not neccesary
      // && this.props.done === "edit done"
    ) {
      this.props.listBlogConnect();
      console.log(this.state.show);

      let allFalseobj = { ...this.state.show };
      let array1 = Object.keys(allFalseobj);
      for (let i = 0; i < array1.length; i++) {
        allFalseobj[array1[i]] = false;
      }
      this.setState({ ...this.state, show: allFalseobj });
    }
  }

  deleteblog = (blogId) => {
    console.log("im here");
    // console.log(this.props.blogs);
    this.props.deleteBlogConnect(blogId);
    // console.log(blogId);
  };

  searchBlog(input) {
    console.log(this.props.blogs);
    this.props.searchBlogConnect(input);
  }

  handleSearchbarChange(e) {
    if (!e.target.value) {
      this.props.listBlogConnect();
      this.setState({
        searchbarInput: "",
        blogSearchText: "Content",
      });
    } else {
      this.setState({
        searchbarInput: e.target.value,
        blogSearchText: `Search result for ${e.target.value}`,
      });
      this.searchBlog(e.target.value);
    }
  }

  render() {
    return (
      <div className="blog-wrapper">
        <h1 className="headblog">TechTok Blog</h1>
        <Input
          type="text"
          className="blogsearch"
          placeholder="Serach by keyword"
          onChange={this.handleSearchbarChange}
        />
        <div className="blog-container">
          <form className="formcs">
            <div className="yourblog">
              <h1>Your Blog</h1>
            </div>

            {/* <label className="bloglabeltext1">Title:</label> */}
            <h3 className="blogsearchtext1">
              {" "}
              {!this.state.searchbarInput ? "Content" : `Search result for ${this.state.searchbarInput}`}
            </h3>
            <br />
            <div>
              <Input
                className="headlineinput"
                type="text"
                onChange={this.onHeadlineChange}
                value={this.state.headline}
                placeholder="Headline"
              />
              <br />
              {/* <label className="bloglabeltext2">Content:</label> */}
              <br />
              <Input
                className="contentinput"
                style={{ color: "black" }}
                type="textarea"
                rows="4"
                onChange={this.onContentChange}
                value={this.state.content}
                placeholder="Content"
              />
            </div>
            <br />
            <div>
              <Button className="blogsubbut" color="primary" onClick={this.addBlog} size="medium" variant="contained">
                POST
              </Button>
            </div>
          </form>

          <br />

          <div className="blognote1">
            {this.props.blogs
              ? this.props.blogs.map((blog, i) => {
                  return (
                    <div key={i} id={blog.id} className="p-3 my-2 rounded bg-docs-transparent-grid">
                      <Toast>
                        <ToastHeader>
                          <div className="blogheadline">
                            <p>{blog.headline}</p>
                          </div>
                        </ToastHeader>
                        <ToastBody>
                          <div className="blogcontent">
                            <p>{blog.content}</p>
                          </div>
                        </ToastBody>

                        <div className="App">
                          <Button
                            size="medium"
                            variant="outlined"
                            className="toggle-button"
                            id="centered-toggle-button"
                            onClick={() => {
                              this.showModal(blog.id);
                            }}
                          >
                            EDIT
                          </Button>
                          <Modal
                            something={blog.id}
                            onClose={() => this.showModal(blog.id)}
                            show={this.state.show[blog.id] || false}
                          ></Modal>
                        </div>

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
      </div>
    );
  }

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
// mapStateToProps = get data from redux store
const mapStateToProps = (state) => {
  return {
    blogs: state.blogStore.blogList,
    done: state.blogStore.done,
    //blogs ＝ get them from state.blogStore.blogList
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
    // editblogConnect: (blogId) => {
    //   dispatch(EditBlogActionThunk(blogId));
    // },
    searchBlogConnect: (input) => {
      dispatch(SearchBlogsActionThunk(input));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);
