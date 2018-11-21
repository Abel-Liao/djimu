import React from "react";

class ChangeText extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.title === "describeYourself" ? (
          <textarea
            name="describeYourself-textarea"
            id=""
            cols="30"
            rows="3"
            ref={this.props.title}
            // value={item.content}
          />
        ) : (
          <input
            className="djm-information-change-input"
            type="text"
            placeholder={this.props.language.input[this.props.title]}
            ref={this.props.title}
          />
        )}
        <span
          onClick={even =>
            this.props.handleClickSure(
              this.props.index,
              this.props.title,
              this.refs[this.props.title],
              even
            )
          }
          className="djm-information-sure"
        >
          {this.props.language.changeSure}
        </span>
        <span
          className="djm-information-cancel"
          onClick={event =>
            this.props.handleClickChange(this.props.title, event)
          }
        >
          {this.props.language.changeCancel}
        </span>
      </React.Fragment>
    );
  }
}
export default ChangeText;
