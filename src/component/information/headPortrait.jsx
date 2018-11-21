import React from "react";

function HeadPortrait(props) {
  return (
    <div className="djm-information-userImg">
      <img src={props.headPortraitUrl} alt="" />
      <span className="djm-information-head-portrait iconfont icon-camera">
        <span className="djm-information-hp-text">
          {props.language.changePortrait}
        </span>
        <input
          onChange={props.handleChangeImg}
          type="file"
          accept="image/png, image/jpeg"
        />
      </span>
    </div>
  );
}
export default HeadPortrait;
