import React from 'react';

import dateFun from '../../../public/date';
import Paging from '../../paging';

function LiList(props) {
  const propsObj = props;
  return (
    // <li className={props.index % 2 === 0 ? "djm-iua-left" : "djm-iua-right"}>
    <li className="djm-iua-list">
      <p className="djm-iua-line">
        <b className="line-one" />
        <b className="line-two" />
        <i className="round-big" />
        <span className="article-author">
          {propsObj.language.author}
          {propsObj.item.authorName}
        </span>
        <span className="article-data">
          {propsObj.language.date}
          {dateFun(propsObj.item.date, 'MM-DD-YYYY')}
        </span>
      </p>
      <div className="djm-iua-img">
        <img
          onClick={event => propsObj.handleClickLink(propsObj.item.id, propsObj.index, event)}
          onKeyDown={event => propsObj.handleClickLink(propsObj.item.id, propsObj.index, event)}
          /* eslint-disable */
          role="button"
          /* eslint-enable */
          tabIndex={0}
          src={propsObj.item.imgUrl}
          alt="图片"
        />
      </div>
      <p className="djm-iua-text">{propsObj.item.title}</p>
      <div className="djm-iua-function">
        <span className="iconfont icon-comments">
          {propsObj.item.comments > 100000
            ? `${parseInt(propsObj.item.comments / 1000, 10)}K+`
            : propsObj.item.comments}
        </span>
        <span
          onClick={(event) => {
            propsObj.handleClickAction('givelike', propsObj.item.id, event);
            propsObj.handleClickGivelike(propsObj.index, event);
          }}
          onKeyDown={(event) => {
            propsObj.handleClickAction('givelike', propsObj.item.id, event);
            propsObj.handleClickGivelike(propsObj.index, event);
          }}
          role="button"
          tabIndex={0}
          className={`${propsObj.item.givelike.isChoose ? 'choosed' : ''} iconfont icon-givelike ${
            propsObj.chooseGivelike === propsObj.index ? 'click-givelike' : ''
          }`}
        >
          {propsObj.item.givelike.number > 100000
            ? `${parseInt(propsObj.item.givelike.number / 1000, 10)}K+`
            : propsObj.item.givelike.number}
        </span>
        <span
          onClick={event => propsObj.handleClickAction('collection', propsObj.item.id, event)}
          onKeyDown={event => propsObj.handleClickAction('collection', propsObj.item.id, event)}
          role="button"
          tabIndex={0}
          className={`${
            propsObj.item.collection.isChoose ? 'choosed' : ''
          } iconfont icon-collection`}
        >
          {propsObj.item.collection > 100000
            ? `${parseInt(propsObj.item.collection.number / 1000, 10)}K+`
            : propsObj.item.collection.number}
        </span>
        <span
          className={`djm-iua-share iconfont icon-plane ${
            propsObj.chooseShare === propsObj.index ? 'click-share' : ''
          }`}
          onClick={event => propsObj.handleClickShare(propsObj.index, event)}
          onKeyDown={event => propsObj.handleClickShare(propsObj.index, event)}
          role="button"
          tabIndex={0}
          ref={propsObj.shareRef(`span${propsObj.index}`)}
        >
          {propsObj.language.share}
        </span>
      </div>
    </li>
  );
}

function UserArticle(props) {
  const propsObj = props;
  return (
    <React.Fragment>
      <ul className="djm-index-uesr-article clearfloat">
        {propsObj.userInfo.map((item, index) =>
          /* eslint-disable */ (propsObj.displayList === 'myCollection' ? (
            item.collection.isChoose ? (
              <LiList key={index} {...props} item={item} index={index} />
            ) : null
          ) : (
            <LiList key={index} {...props} item={item} index={index} />
          )),
        )
        /* eslint-enable */
        }
        <span className="separated-line" />
      </ul>
      {propsObj.userInfo.length === 0 ? null : (
        <Paging
          {...props}
          pageLength={Math.ceil(propsObj.uesrArr.length / 8)}
          changePage={propsObj.changePage}
          displayList={propsObj.displayList}
        />
      )}
    </React.Fragment>
  );
}
export default UserArticle;
