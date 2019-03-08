import React from 'react';

import Banner from '../../banner';

function LookImg(props) {
  const { handleClickLookImg, imgCount } = props;
  return (
    <div className="djm-look-img">
      <span
        className="djm-look-img-close iconfont icon-close"
        onClick={handleClickLookImg}
        onKeyDown={handleClickLookImg}
        role="button"
        tabIndex={0}
      />
      <Banner bannerUrl={imgCount} loop={false} dots={false} toggleButton {...props} />
    </div>
  );
}
export default LookImg;
