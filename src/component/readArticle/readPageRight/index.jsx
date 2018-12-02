import React from 'react';

import Banner from "../../banner";

function ReadPageRight (props){
    return (
        <div className="djm-readpage-content-right">
            <div className="djm-rcr-top">
                本文共有<span>{props.wordCount}</span>字，共有<span>{props.imgCount.length}</span>张图片
            </div>
            <div className="djm-rcr-banner" onClick={props.handleClickLookImg}>
                <Banner bannerUrl={props.imgCount} dots={false}/>
            </div>
        </div>
    )
}

export default ReadPageRight