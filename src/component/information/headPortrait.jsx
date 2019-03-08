import React from 'react';

function HeadPortrait(props) {
  const propsObj = props;
  const { headPortraitUrl, handleChangeImg, language } = propsObj;
  return (
    <div className="djm-information-userImg">
      <img src={headPortraitUrl} alt="" />
      <span className="djm-information-head-portrait iconfont icon-camera">
        <span className="djm-information-hp-text">{language.changePortrait}</span>
        <input onChange={handleChangeImg} type="file" accept="image/png, image/jpeg" />
      </span>
    </div>
  );
}
export default HeadPortrait;
