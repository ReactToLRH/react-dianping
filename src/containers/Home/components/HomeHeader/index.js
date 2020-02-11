import React, { Component } from 'react';
import "./style.css";

class HomeHeader extends Component {
  render() {
    return (
      <div className="homeHeader">
        <header className="homeHeader__wrapper">
          <a className="homeHeader__city" href='/'>北京</a>
          <a className="homeHeader__search" href='/'>输入商户名、地点</a>
          <a className="homeHeader__self" href='/'>
            <div className="homeHeader__portrait"/>
          </a>
        </header>
      </div>
    );
  }
}

export default HomeHeader;