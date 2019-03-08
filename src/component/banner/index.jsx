import React from 'react';
import { connect } from 'react-redux';

import './banner.css';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerIndex: 0,
      bannerTime: null,
      ulTransform: 0,
      ulStyle: {
        width: null,
        transform: 'translateX(0)',
      },
      liStyle: {
        width: null,
      },
      bannerUrl: [
        require('./images/index_banner1.jpg'),
        require('./images/index_banner2.jpg'),
        require('./images/index_banner3.jpg'),
        require('./images/index_banner4.jpg'),
      ],
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.bannerFun = this.bannerFun.bind(this);
    this.handleClcikNP = this.handleClcikNP.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.bannerUrl !== prevState.bannerUrl && nextProps.bannerUrl) {
      return { bannerUrl: nextProps.bannerUrl };
    }
    return null;
  }

  componentDidMount() {
    const propsObj = this.props;
    const loop = propsObj.loop !== undefined ? propsObj.loop : true;
    if (loop) {
      this.bannerFun();
    }
    if (propsObj.bannerUrl !== undefined) {
      this.setState({ bannerUrl: propsObj.bannerUrl });
      const ulStyleWidth = `${propsObj.bannerUrl.length * 100}%`;
      const liStyleWidth = `${100 / propsObj.bannerUrl.length}%`;
      this.setState({
        ulStyle: {
          width: ulStyleWidth,
          transform: 'translateX(0)',
        },
      });
      this.setState({
        liStyle: { width: liStyleWidth },
      });
    }
  }

  componentWillUnmount() {
    const { bannerTime } = this.state;
    clearInterval(bannerTime);
  }

  bannerFun() {
    const propsObj = this.props;
    const switchTime = propsObj.switchTime !== undefined ? propsObj.switchTime : 3000;
    this.setState({
      bannerTime: setInterval(() => {
        const { bannerIndex, bannerUrl } = this.state;
        this.setState({
          bannerIndex: bannerIndex + 1 > bannerUrl.length - 1 ? 0 : bannerIndex + 1,
        });
      }, switchTime),
    });
  }

  handleMouseEnter(index) {
    const { bannerTime } = this.state;
    clearInterval(bannerTime);
    this.setState({ bannerIndex: index });
  }

  handleMouseLeave() {
    const propsObj = this.props;
    const loop = propsObj.loop !== undefined ? propsObj.loop : true;
    if (loop) {
      this.bannerFun();
    }
  }

  handleClcikNP(number) {
    const { ulTransform } = this.state;
    this.setState(
      {
        ulTransform: ulTransform + (number ? 1 : -1),
      },
      () => {
        const propsObj = this.props;
        this.setState({
          ulStyle: {
            width: propsObj.bannerUrl ? `${propsObj.bannerUrl.length * 100}%` : null,
            /* eslint-disable */
            transform: `translateX(${this.state.ulTransform * (100 / propsObj.bannerUrl.length)}%)`,
            /* eslint-enable */
          },
        });
      },
    );
  }

  render() {
    const {
      ulStyle, liStyle, bannerIndex, bannerUrl, ulTransform,
    } = this.state;
    const propsObj = this.props;
    const toggleButton = propsObj.toggleButton !== undefined ? propsObj.toggleButton : false;
    const dots = propsObj.dots !== undefined ? propsObj.dots : true;
    return (
      <div className="djm-banner">
        <ul
          className={`djm-banner-img ${toggleButton ? 'img-float clearfloat' : 'img-pos'}`}
          style={toggleButton ? ulStyle : null}
        >
          {bannerUrl.map((url, index) => (
            <li
              key={url}
              className={bannerIndex === index ? 'djm-ibi-display' : null}
              style={toggleButton ? liStyle : null}
            >
              <img src={url} alt="banner" />
            </li>
          ))}
        </ul>
        {dots ? (
          <ul className="djm-banner-indicator clearfloat">
            {bannerUrl.map((url, index) => (
              <li
                onMouseEnter={enve => this.handleMouseEnter(index, enve)}
                onMouseLeave={enve => this.handleMouseLeave(index, enve)}
                key={url}
                className={bannerIndex === index ? 'djm-ibi-choose' : null}
              />
            ))}
          </ul>
        ) : null}
        {!toggleButton ? null : (
          <React.Fragment>
            {ulTransform >= 0 ? null : (
              <span
                className="djm-banner-prev iconfont icon-previous"
                onClick={event => this.handleClcikNP(true, event)}
                onKeyDown={event => this.handleClcikNP(true, event)}
                role="button"
                tabIndex={0}
              />
            )}
            {ulTransform <= -propsObj.bannerUrl.length + 1 ? null : (
              <span
                className="djm-banner-next iconfont icon-next"
                onClick={event => this.handleClcikNP(false, event)}
                onKeyDown={event => this.handleClcikNP(false, event)}
                role="button"
                tabIndex={0}
              />
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Banner);
