import React from "react";
class Likes extends React.Component {
  state = {
    likes: 0,
  };
  handleClick = () => {
    if (this.state.likes == 0) {
      this.setState({
        likes: 1,
      });
    } else {
      this.setState({
        likes: 0,
      });
    }
  };
  render() {
    return (
      <div>
        {this.state.likes == 0 ? (
          <button onClick={this.handleClick}>
            <i className="far fa-heart"></i>
          </button>
        ) : (
          <button onClick={this.handleClick}>❤️</button>
        )}
      </div>
    );
  }
}
export default Likes;
