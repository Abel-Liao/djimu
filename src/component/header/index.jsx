import React from "react";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      add: {
        name: "G",
        age: 20
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.dispatch({ type: "ADD_TODO", content: this.state.add });
    this.setState({ num: this.state.num + 1 });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return false;
  }
  render() {
    return (
      <header>
        <h2>This is header page!</h2>
        {this.props.todos.map((names, index) => (
          <p key={index}>{names.name}</p>
        ))}
        <input type="button" value="Click Me" onClick={this.handleClick} />
      </header>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return state;
}
// function mapDispatchToProps(dispatch) {
//   console.log(dispatch);
//   return dispatch;
// }
export default connect(
  mapStateToProps
  // mapDispatchToProps
)(Header);
