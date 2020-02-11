import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ErrorToast from '../../components/ErrorToast';
import { actions as appActions, getError } from '../../redux/modules/app'
import './App.css';

class App extends Component {
  render () {
    const { error, appActions: { clearError } } = this.props;
    return (
      <div className="App">
        { error ? <ErrorToast msg={error} clearError={clearError} /> : null }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    error: getError(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // bindActionCreators() 可以⾃动把多个 action 创建函数 绑定到dispatch() ⽅法上。
    appActions: bindActionCreators(appActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
