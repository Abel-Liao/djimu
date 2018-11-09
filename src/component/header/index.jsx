import React from "react";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      names: [
        {
          name: "S",
          age: 18
        },
        {
          name: "D",
          age: 19
        }
      ]
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // this.props.dispatch(this.state.names);
    // console.log(this.props);
    this.setState({ num: this.state.num + 1 });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    return false;
  }
  render() {
    return (
      <header>
        <h2>This is header page!</h2>
        {this.state.names.map((names, index) => (
          <p key={index}>{names.name}</p>
        ))}
      </header>
    );
  }
}
function mapStateToProps(state, ownProps) {
  console.log(state);
  return state;
}
export default connect(mapStateToProps)(Header);
