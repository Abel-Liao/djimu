import React from "react";

class ChangeText extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.title === "describeYourself" ? (
          <textarea
            className="djm-information-change-textarea"
            name="describeYourself-textarea"
            id=""
            cols="30"
            rows="3"
            ref={this.props.title}
            value={this.props.content}
            onChange={event =>
              this.props.handleChangeValue(this.props.index, event)
            }
          />
        ) : (
          <input
            className="djm-information-change-input"
            type="text"
            placeholder={this.props.language.input[this.props.title]}
            ref={this.props.title}
            value={this.props.content}
            onChange={event =>
              this.props.handleChangeValue(this.props.index, event)
            }
          />
        )}
        <span
          onClick={event => {
            this.props.handleClickSure(
              this.props.title,
              this.props.index,
              this.refs[this.props.title],
              event
            );
            this.props.handleClickChange(
              this.props.title,
              this.props.index,
              false,
              event
            );
          }}
          className="djm-information-sure"
        >
          {this.props.language.changeSure}
        </span>
        <span
          className="djm-information-cancel"
          onClick={event =>
            this.props.handleClickChange(
              this.props.title,
              this.props.index,
              true,
              event
            )
          }
        >
          {this.props.language.changeCancel}
        </span>
      </React.Fragment>
    );
  }
}
export default ChangeText;
