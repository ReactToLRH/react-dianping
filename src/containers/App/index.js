import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { connect } from 'react-redux';
import ErrorToast from '../../components/ErrorToast';
import { actions as appActions, getError } from '../../redux/modules/app'
import AsyncComponent from "../../utils/AsyncComponent";
import PrivateRoute from "../PrivateRoute";

import './style.css';

const Home = AsyncComponent(() => import("../Home")); // 此处 import 为运算符，返回的为一个 Promise 对象
const ProductDetail = AsyncComponent(() => import("../ProductDetail"));
const Search = AsyncComponent(() => import("../Search"));
const SearchResult = AsyncComponent(() => import("../SearchResult"));
const Login = AsyncComponent(() => import("../Login"));
const User = AsyncComponent(() => import("../User"));
const Purchase = AsyncComponent(() => import("../Purchase"));

class App extends Component {
  render () {
    const { error, appActions: { clearError } } = this.props;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/user" component={User} />
            <Route path="/detail/:id" component={ProductDetail} />
            <Route path="/search" component={Search} />
            <Route path="/search_result" component={SearchResult} />
            <PrivateRoute path="/purchase/:id" component={Purchase} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
