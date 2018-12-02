import React from "react";
import { connect } from "react-redux";

import "./banner.css";

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerIndex: 0,
      bannerTime: null,
      dots: props.dots===false?props.dots:true,
      loop: props.loop===false?props.loop:true,
      toggleButton: props.toggleButton?props.toggleButton:false,
      ulTransform: 0,
      ulStyle: {
        width: props.bannerUrl?(props.bannerUrl.length*100+'%'):null,
        transform: 'translateX(0)'
      },
      liStyle: {
        width: props.bannerUrl?(100/props.bannerUrl.length+'%'):null
      },
      bannerUrl: props.bannerUrl
        ? props.bannerUrl
        : [
            require("./images/index_banner1.jpg"),
            require("./images/index_banner2.jpg"),
            require("./images/index_banner3.jpg"),
            require("./images/index_banner4.jpg")
          ]
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.bannerFun = this.bannerFun.bind(this);
    this.handleClcikNP = this.handleClcikNP.bind(this);
  }
  bannerFun() {
    this.setState({
      bannerTime: setInterval(() => {
        this.setState({
          bannerIndex:
            this.state.bannerIndex + 1 > this.state.bannerUrl.length - 1
              ? 0
              : this.state.bannerIndex + 1
        });
      }, 3000)
    });
  }
  handleMouseEnter(index) {
    clearInterval(this.state.bannerTime);
    this.setState({ bannerIndex: index });
  }
  handleMouseLeave() {
    if(this.state.loop){
      this.bannerFun()
    }
  }
  handleClcikNP(number){
    this.setState({
      ulTransform: (this.state.ulTransform+(number?1:-1))
    },()=>(
      this.setState({
        ulStyle:{
          width:this.props.bannerUrl?(this.props.bannerUrl.length*100+'%'):null,
          transform: `translateX(${this.state.ulTransform*(100/this.props.bannerUrl.length)}%)`
        }
      })
    ));
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.bannerUrl !== prevState.bannerUrl && nextProps.bannerUrl){
      return {bannerUrl: nextProps.bannerUrl}
    }
    return null;
  }
  componentDidMount() {
    if(this.state.loop){
      this.bannerFun()
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.bannerTime);
  }
  render() {
    return (
      <div className="djm-banner">
        <ul className={`djm-banner-img ${this.state.toggleButton?'img-float clearfloat':'img-pos'}`} style={this.state.toggleButton?this.state.ulStyle:null}>
          {this.state.bannerUrl.map((url, index) => (
            <li
              key={index}
              className={
                this.state.bannerIndex === index ? "djm-ibi-display" : null
              }
              style={this.state.toggleButton?this.state.liStyle:null}
            >
              <img src={url} alt="banner" />
            </li>
          ))}
        </ul>
        {this.state.dots?(<ul className="djm-banner-indicator clearfloat">
          {this.state.bannerUrl.map((url, index) => (
            <li
              onMouseEnter={enve => this.handleMouseEnter(index, enve)}
              onMouseLeave={enve => this.handleMouseLeave(index, enve)}
              key={index}
              className={
                this.state.bannerIndex === index ? "djm-ibi-choose" : null
              }
            />
          ))}
        </ul>):null}
        {!this.state.toggleButton?null:(
          <React.Fragment>
            {this.state.ulTransform>=0?null:(
              <span className="djm-banner-prev iconfont icon-previous" onClick={event=>this.handleClcikNP(true,event)} />
            )}
            {this.state.ulTransform<=-this.props.bannerUrl.length+1?null:(
              <span className="djm-banner-next iconfont icon-next" onClick={event=>this.handleClcikNP(false,event)} />
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(Banner);
