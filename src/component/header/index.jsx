import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ num: this.state.num + 1 });
  }
  render() {
    return (
      <header>
        <h2>This is header page!</h2>
        <p onClick={this.handleClick}>{this.state.num}</p>
      </header>
    );
  }
}
export default Header;
