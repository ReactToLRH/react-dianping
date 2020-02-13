import React, { Component } from 'react';

export default function asyncComponent (importComponent) {
  class AsyncComponent extends Component {
    constructor (props) {
      super(props);
      this.state = {
        component: null
      }
    }

    componentDidMount () {
      // mod 为组件加载完成的js模块，mod.default则为真正所需要获取的组件
      importComponent().then((mod) => {
        this.setState({
          component: mod.default 
        })
      })
    }

    render () {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null
    }
  }

  return AsyncComponent;
}