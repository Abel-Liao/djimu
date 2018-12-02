import React from 'react';

import Banner from '../../banner'

function LookImg(props){
    return (
        <div className="djm-look-img">
            <span className="djm-look-img-close iconfont icon-close" onClick={props.handleClickLookImg} />
            <Banner bannerUrl={props.imgCount} loop={false} dots={false} toggleButton={true}/>
        </div>
    )
}
export default LookImg