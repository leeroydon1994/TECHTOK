import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";
import { EditBlogActionThunk } from "../../Redux/Blog/actions";
import { connect } from "react-redux";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      content: "",
    };
  }

  componentDidMount() {
    console.log("running2");
    console.log(this.props.blogs);

    console.log(this.props.blogs);
    console.log(this.props.something);
    const singleBlogArray = this.props.blogs.filter((blog) => blog.id === this.props.something);
    const signleBlog = singleBlogArray[0];
    this.setState({
      headline: signleBlog.headline,
      content: signleBlog.content,
    });
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

  editblog = (blogId, blog) => {
    console.log("im editing");
    console.log(blogId, blog);
    this.props.editBlogConnect(blogId, blog);
  };

  onClose = (blogId) => {
    // console.log(this.props.something);
    this.props.onClose && this.props.onClose(blogId);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal1" id="modal">
        <div className="p-3 my-2 rounded bg-docs-transparent-grid">
          <div className="modal-content">
            <label>Headline</label>
            <textarea value={this.state.headline} onChange={this.onHeadlineChange}></textarea>
          </div>
          <div className="modal-content">
            <label>Content</label>
            <textarea value={this.state.content} onChange={this.onContentChange}></textarea>
          </div>
        </div>

        <div className="content">{this.props.children}</div>
        <div className="actions">
          <button className="toggle-button" onClick={this.onClose}>
            CLOSE
          </button>
          <button
            className="toggle-button"
            onClick={() =>
              this.editblog(this.props.something, {
                headline: this.state.headline,
                content: this.state.content,
              })
            }
          >
            SAVE
          </button>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogStore.blogList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editBlogConnect: (blogId, blog) => {
      dispatch(EditBlogActionThunk(blogId, blog));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
