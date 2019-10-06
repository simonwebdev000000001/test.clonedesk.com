import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import { signIn, setVal, moduleName } from '../../../ducks/auth';
import { Link } from 'react-router-dom';

interface Props {
  authError: any
  setVal: Function,
  signIn: Function
}

interface State {
  error: any
  email: String,
}

class Login extends Component<Props, State> {

  state = {
    error: false,
    email: '',
  };


  componentDidMount(): void {
    this.props.setVal({ key:'error',value:null });
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
    e.preventDefault();
    e.stopPropagation();
    let error = this.validate();
    this.setState({ error });
    if (!error) {
      try {
        this.props.setVal({ error: 'No request' });
      } catch (e) {
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
          <Form onSubmit={this.onSubmit} noValidate>
            <h3 className="form-title font-green">Forgot Psw</h3>

            {
              authError && (
                <div className="alert alert-danger">
                  <button className="close" data-close="alert"
                          onClick={() => this.props.setVal({ key: 'error', value: null })}></button>
                  <span>Not implemented</span>
                </div>
              )
            }
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="e-mail" name={'email'} onChange={this.onInput}
                            value={this.state.email}/>
              {
                error && error.email && (
                  <span className="text-error help-block">
                    {error.email}
                  </span>
                )
              }
            </Form.Group>


            <div className="form-actions">
              <button type="submit" className="btn green uppercase">Send</button>
              <Link className="forget-password" to={'/'}>Login</Link>
            </div>


          </Form>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state: any) => ({
  authError: state[moduleName].error,
});

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    setVal,
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
