import React from 'react';
import { connect } from 'react-redux';

import dateFun from '../../public/date';
import Banner from '../banner';

import ReadPageRight from './readPageRight';
import LookImg from './lookImg';

import './readArticle.css';

class ReadArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleNumber: props.location.search.split('&')[0].split('=')[1],
      articleInfo: null,
      lookImg: false,
      wordCount: null,
      imgCount: [],
      h2Elevator: [],
      elevatorNum: 0,
      scrollTop: 0,
      timeScroll: null,
      /* eslint-disable */
      listenScroll: null,
      elementNode: null,
      ulClientHeight: null,
      ulScrollHeight: null,
      partentHeight: null,
      childHeight: null,
      mouseDis: false,
      timerClicdH: null,
      ulNode: null,
      bannerUrl: [
        require('./images/banner/read_banner1.jpg'),
        require('./images/banner/read_banner2.jpg'),
        require('./images/banner/read_banner3.jpg'),
        require('./images/banner/read_banner4.jpg'),
      ],
      scrollNumber: 0,
      stepNum: 0,
      /* eslint-enable */
      // pStyle: {
      //   // height: "70%",
      //   transform: "translateY(0)"
      // },
      ulStyle: {
        transform: 'translateY(0)',
      },
    };
    this.handleClickCollection = this.handleClickCollection.bind(this);
    this.handleClickLookImg = this.handleClickLookImg.bind(this);
    this.handleClickElevator = this.handleClickElevator.bind(this);
    // this.onScrollHeight = this.onScrollHeight.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollFun = this.scrollFun.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ elementNode: this.childEle.children }, () => this.scrollFun());
    window.addEventListener('scroll', this.handleScroll);
    /* eslint-disable */
    this.setState({
      timerClicdH: setTimeout(() => {
        this.setState({ childHeight: this.refScroll.scrollHeight });
      }, 10),
    });
    /* eslint-enable */
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // if (this.chooseContent(nextProps.articleStore) !== prevState.articleInfo) {
    //   return { articleInfo: nextProps.articleStore[prevState.articleNumber] };
    // }
    /* eslint-disable */
    const chooseContentFun = function(arr) {
      let temporary = null;
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].id === parseInt(prevState.articleNumber, 10)) {
          return (temporary = arr[i]);
        }
      }
      return temporary;
      /* eslint-enable */
    };
    if (prevState.articleInfo === null) {
      return { articleInfo: chooseContentFun(nextProps.articleStore) };
    }
    if (chooseContentFun(nextProps.articleStore) !== prevState.articleInfo) {
      return { articleInfo: chooseContentFun(nextProps.articleStore) };
    }
    return null;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    // this.refScroll.removeEventListener("scroll", this.onScrollHeight);
    const { timeScroll } = this.state;
    if (timeScroll) {
      clearInterval(timeScroll);
    }
  }

  // 注释部分为自定义滚动条

  // onScrollHeight(parentHeight, childHight, e) {
  //   const step = Math.ceil((childHight - parentHeight) / 50);
  //   let temporary = null;
  //   if (e.wheelDelta) {
  //     temporary = e.wheelDelta > 0 ? true : false;
  //   } else {
  //     temporary = e.detail < 0 ? true : false;
  //   }
  //   if (temporary && this.state.scrollNumber < 0) {
  //     this.setState(
  //       state => ({ stepNum: state.stepNum - 100 / step }),
  //       () => {
  //         return this.ulScrollFun(temporary, this.state.stepNum);
  //       }
  //     );
  //   } else if (
  //     !temporary &&
  //     this.state.scrollNumber > Math.ceil(parentHeight - childHight)
  //   ) {
  //     this.setState(
  //       state => ({ stepNum: state.stepNum + 100 / step }),
  //       () => {
  //         return this.ulScrollFun(temporary, this.state.stepNum);
  //       }
  //     );
  //   }
  // }
  // ulScrollFun(isUp, step) {
  //   this.setState(
  //     num => ({ scrollNumber: num.scrollNumber + (isUp ? 1 : -1) * 50 }),
  //     () => {
  //       const temporaryNum = this.state.scrollNumber;
  //       return (
  //         this.setState({
  //           pStyle: {
  //             transform: `translateY(${step}%`
  //           }
  //         }),
  //         this.setState({
  //           ulStyle: {
  //             transform: `translateY(${temporaryNum}px`
  //           }
  //         })
  //       );
  //     }
  //   );
  // }
  onMouseEnter() {
    // const temporary = this.refScroll;
    // const temporaryPar = temporary.offsetParent.clientHeight;
    // const temporaryChi = temporary.scrollHeight;
    // if (temporaryChi > 500) {
    //   this.setState({
    //     pStyle: {
    //       transform: `translateY(${this.state.scrollNumber})`
    //     }
    //   });
    //   if (temporary.addEventListener) {
    //     temporary.addEventListener("DOMMouseScroll", event =>
    //       this.onScrollHeight(temporaryPar, temporaryChi, event)
    //     );
    //   }
    //   temporary.onmousewheel = event =>
    //     this.onScrollHeight(temporaryPar, temporaryChi, event);
    // }
    this.setState(state => ({ mouseDis: !state.mouseDis }));
  }

  onMouseLeave() {
    // this.setState({ childHeight: 0 });
    this.setState(state => ({ mouseDis: !state.mouseDis }));
  }

  handleClickLookImg() {
    this.setState(state => ({ lookImg: !state.lookImg }));
  }

  handleClickCollection() {
    const propsObj = this.props;
    propsObj.dispatch({
      type: 'CHANGE_ARTICLE',
      dataNumber: propsObj.location.search.split('&')[1].split('=')[1],
      dataName: 'collection',
      dataValue: !propsObj.articleInfo.collection.isChoose,
    });
  }

  handleClickElevator(index) {
    const { timeScroll, elementNode } = this.state;
    clearInterval(timeScroll);
    let temporaryScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const temporary = elementNode[index].offsetTop + 330;
    this.setState({
      timeScroll: setInterval(() => {
        if (temporaryScroll < temporary) {
          temporaryScroll += 200;
          window.scrollTo(0, temporaryScroll);
          if (temporaryScroll >= temporary) {
            /* eslint-disable */
            clearInterval(this.state.timeScroll);
            /* eslint-enable */
          }
        } else {
          temporaryScroll -= 200;
          window.scrollTo(0, temporaryScroll);
          if (temporaryScroll <= temporary) {
            /* eslint-disable */
            clearInterval(this.state.timeScroll);
            /* eslint-enable */
          }
        }
      }, 10),
    });
  }

  handleScroll() {
    const temporary = document.body.scrollTop || document.documentElement.scrollTop;
    const { h2Elevator, elementNode } = this.state;
    for (let i = 0; i < h2Elevator.length - 1; i += 1) {
      if (
        temporary >= elementNode[h2Elevator[i].index].offsetTop
        && temporary <= elementNode[h2Elevator[i + 1].index].offsetTop
      ) {
        this.setState({ elevatorNum: i });
      }
    }
    if (
      h2Elevator.length > 0
      && temporary >= elementNode[h2Elevator[h2Elevator.length - 1].index].offsetTop
    ) {
      this.setState({ elevatorNum: h2Elevator.length - 1 });
    }
    this.setState({ scrollTop: temporary });
  }

  scrollFun() {
    const { elementNode } = this.state;
    let wordCount = 0;
    const imgCount = [];
    const h2Elevator = [];
    for (let i = 0; i < elementNode.length; i += 1) {
      if (elementNode[i].nodeName !== 'IMG') {
        if (elementNode[i].nodeName === 'H2') {
          h2Elevator.push({
            content: elementNode[i].innerText,
            index: i,
          });
        }
        wordCount += elementNode[i].innerText.length;
      } else {
        imgCount.push(elementNode[i].src);
      }
    }
    this.setState({ wordCount });
    this.setState({ imgCount });
    this.setState({ h2Elevator });
  }

  render() {
    const {
      articleInfo,
      bannerUrl,
      wordCount,
      imgCount,
      h2Elevator,
      elevatorNum,
      scrollTop,
      ulStyle,
      childHeight,
      mouseDis,
      lookImg,
    } = this.state;
    const propsObj = this.props;
    const language = propsObj.languageStore.language.readArticle;
    // console.log(this.state.ulClientHeight);
    return (
      <div className="djm-readPage">
        <div className="djm-readPage-banner">
          <Banner bannerUrl={bannerUrl} {...this.props} />
        </div>
        <div className="djm-readPage-main">
          <div className="djm-readPage-header">
            <img src={require('./images/user_img.jpg')} alt="Head portrait" />
            <div className="title-author">
              <h1>{articleInfo.title}</h1>
              <p>
                <span className="article-author">{articleInfo.authorName}</span>
                <span className="focusOn-author">{language.focusOn}</span>
                <span>{dateFun('2018-10-15', 'YYYY-MM-DD')}</span>
                <span className="iconfont icon-eyes">
                  {language.readNumber}
                  {articleInfo.readNumber}
                </span>
                <span
                  className={`iconfont icon-collection ${
                    articleInfo.collection.isChoose ? 'collection-article' : null
                  }`}
                  onClick={this.handleClickCollection}
                  onKeyDown={this.handleClickCollection}
                  role="button"
                  tabIndex={0}
                >
                  {language.collection}
                </span>
                <span className="iconfont icon-plane">{language.share}</span>
              </p>
            </div>
          </div>
          <ul className="djm-readPage-travel-info clearfloat">
            <li>
              <span>{language.time}</span>
              {dateFun(articleInfo.date, 'YYYY-MM-DD')}
            </li>
            <li>
              <span>{language.days}</span>
              {articleInfo.days}
              {language.dayUnit}
            </li>
            <li>
              <span>{language.peoples}</span>
              {articleInfo.peoples}
              {language.PeopleUnit}
            </li>
            <li>
              <span>{language.money}</span>
              {articleInfo.cost}
              {language.moneyUnit}
            </li>
          </ul>
          <div className="djm-readPage-content clearfloat">
            <div
              className="djm-readPage-content-left"
              dangerouslySetInnerHTML={{ __html: articleInfo.content }}
              ref={(ele) => {
                this.childEle = ele;
              }}
            />
            <ReadPageRight
              {...this.props}
              wordCount={wordCount}
              imgCount={imgCount}
              handleClickLookImg={this.handleClickLookImg}
              h2Elevator={h2Elevator}
              elevatorNum={elevatorNum}
              handleClickElevator={this.handleClickElevator}
              // onScrollHeight={this.onScrollHeight}
              scrollTop={scrollTop}
              language={language}
              refScroll={(ele) => {
                this.refScroll = ele;
              }}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              // pStyle={this.state.pStyle}
              ulStyle={ulStyle}
              childHeight={childHeight}
              mouseDis={mouseDis}
            />
          </div>
        </div>
        {lookImg ? (
          <LookImg
            {...this.props}
            imgCount={imgCount}
            handleClickLookImg={this.handleClickLookImg}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ReadArticle);
