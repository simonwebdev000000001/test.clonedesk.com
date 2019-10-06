import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import { signIn, setVal, moduleName } from '../../../ducks/auth';
import './login.scss';
import { Link } from 'react-router-dom';

interface Props {
  authError: any
  loading: boolean,
  setVal: Function,
  signIn: Function
}

interface State {
  error: any
  email: String,
  password: String
}

export class Login extends Component<Props, State> {

  state = {
    error: false,
    email: '',
    password: '',
  };

  componentDidMount(): void {
    this.props.setVal({ key: 'error', value: null });
  }

  onInput = (e: any) => {
    this.setState({
      ...this.state,
      ...({
        [e.target.name]: e.target.value,
        error: null,
      }),
    });
  };
  onSubmit = async (e: any) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    let error = this.validate();
    this.setState({ error });
    if (!error) {
      try {
        await this.props.signIn(this.state);
      } catch (e) {
      } finally {
      }
    }
  };

  private validate() {
    const values: any = this.state;
    if (!values.email) {
      return {
        email: 'Field is required',
      };
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      return {
        email: 'Field should be in proper format',
      };
    }
    if (!values.password) {
      return {
        password: 'Field is required',
      };
    }
  }

  render() {
    const { authError } = this.props;
    const { error }: any = this.state;
    return (
      <div className={'auth login'}>
        <div className="logo">
          <h3 className="logo-default">CloneDesk</h3>
        </div>
        <div className="content">
          <Form onSubmit={this.onSubmit} noValidate id={'form'}>
            <h3 className="form-title font-green">Sign In</h3>
            {
              authError && (
                <div className="alert alert-danger">
                  <button className="close" data-close="alert"
                          onClick={() => this.props.setVal({ key: 'error', value: null })}></button>
                  <span>Invalid username or password</span>
                </div>
              )
            }

            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="e-mail" name={'email'} onChange={this.onInput}
                            value={this.state.email}/>
              {
                error && error.email && (
                  <span className="text-error">
                    {error.email}
                  </span>
                )
              }
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" name={'password'} onChange={this.onInput}
                            value={this.state.password}/>
              {
                error && error.password && (
                  <span className="text-error">
                    {error.password}
                  </span>
                )
              }
            </Form.Group>

            <div className="form-actions">
              <button id="btn" type="submit" className="btn green uppercase" disabled={this.props.loading}>
                Login
              </button>

              <label className="rememberme check mt-checkbox mt-checkbox-outline">
                <input type="checkbox" name="loginForm[remember]" value="1"/>Remember<span/>
              </label>
              <Link className="forget-password" to={'/forgot-password'}>Forgot Password?</Link>
            </div>

          </Form>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state: any) => ({
  authError: state[moduleName].error,
  loading: state[moduleName].loading,
});

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    setVal,
    signIn,
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
