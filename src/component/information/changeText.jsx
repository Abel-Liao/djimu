import React from 'react';

class ChangeText extends React.Component {
  render() {
    const propsObj = this.props;
    const {
      title, content, index, language,
    } = propsObj;
    return (
      <React.Fragment>
        {title === 'describeYourself' ? (
          <textarea
            className="djm-information-change-textarea"
            name="describeYourself-textarea"
            id=""
            cols="30"
            rows="3"
            ref={title}
            value={content}
            onChange={event => propsObj.handleChangeValue(index, event)}
          />
        ) : (
          <input
            className="djm-information-change-input"
            type="text"
            placeholder={language.input[title]}
            ref={title}
            value={content}
            onChange={event => propsObj.handleChangeValue(index, event)}
          />
        )}
        <span
          onClick={(event) => {
            /* eslint-disable */
            propsObj.handleClickSure(title, index, this.refs[title], event);
            propsObj.handleClickChange(title, index, false, event);
          }}
          onKeyDown={event => {
            propsObj.handleClickSure(title, index, this.refs[title], event);
            propsObj.handleClickChange(title, index, false, event);
            /* eslint-enable */
          }}
          role="button"
          tabIndex={0}
          className="djm-information-sure"
        >
          {language.changeSure}
        </span>
        <span
          className="djm-information-cancel"
          onClick={event => propsObj.handleClickChange(title, index, true, event)}
          onKeyDown={event => propsObj.handleClickChange(title, index, true, event)}
          role="button"
          tabIndex={0}
        >
          {language.changeCancel}
        </span>
      </React.Fragment>
    );
  }
}
export default ChangeText;
