import React, { Component } from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import HomePage from './views/home';
import Login from './views/auth/login/index';
import ForgotPassword from './views/auth/forgot-psw';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUser, userSelector, moduleName } from './ducks/auth';


class AppRoutes extends Component<{ user: any, isChecked: boolean, loadUser: any },
  {}> {

  componentDidMount(): void {
    this.props.loadUser();
  }

  render() {
    const { user, isChecked } = this.props;

    if (!isChecked) return null;
    const loader: any = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
    return (
      <BrowserRouter>
        {
          user ? (
              <Switch>
                <Route path='/home' component={HomePage}/>

                <Route exact path="*" render={() => (
                  <Redirect to="/home"/>
                )}/>
              </Switch>
            ) :
            (
              <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/forgot-password' component={ForgotPassword}/>
                <Route exact path="*" render={() => (
                  <Redirect to="/login"/>
                )}/>
              </Switch>
            )
        }
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    loadUser,
  }, dispatch)
);
const mapStateToProps = (state: any) => ({
  user: userSelector(state),
  isChecked: state[moduleName].isChecked,
});
export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);

