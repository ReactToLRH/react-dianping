import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../../redux/modules/login";

class PrivateRoute extends Component {
  render() {
    const { component: Component, login, ...rest } = this.props;
    console.log('PrivateRoute props', this.props)
    return (
      <Route
        {...rest}
        render={props => {
          return login ? 
            (<Component {...props} />) 
            : 
            (
              // 重定向
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            );
        }}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    login: isLogin(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
