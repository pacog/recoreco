import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as EmailValidator from 'email-validator';
import { authActions } from '../../core/auth';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { getLoginError } from '../../core/auth';

const mainButtonStyle = {
  display: 'block',
  marginTop: 20
};

const blockStyle = {
  display: 'block'
};

const emptyState = { email: '', password: '', emailError: false, passwordError: false };

class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor({ error, dispatchLoginButtonClicked }) {
    super();
    this.state = {
      ...emptyState,
      error
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.loginButtonClicked = this.loginButtonClicked.bind(this);
    this.buttonShouldBeDisabled = this.buttonShouldBeDisabled.bind(this);
    this.dispatchLoginButtonClicked = dispatchLoginButtonClicked;
  }

  handleEmailChange(event) {
    const email = event.target.value;
    this.setState({ email: email });
    this.setState({ emailError: this.getEmailError(email) });
  }

  getEmailError(email) {
    if(!email) {
      return 'This field is required';
    } else if(EmailValidator.validate(email)) {
      return false;
    } else {
      return 'This is not a valid email';
    }
  }

  handlePasswordChange(event) {
    const password = event.target.value;
    this.setState({ password: password });
    this.setState({ passwordError: this.getPasswordError(password) });
  }

  getPasswordError(password) {
    if(!password) {
      return 'Please enter your password';
    } else {
      return false;
    }
  }

  loginButtonClicked() {
    this.dispatchLoginButtonClicked(this.state.email, this.state.password);
  }

  buttonShouldBeDisabled() {
    return !!(this.state.emailError || this.state.passwordError);
  }

  getServerError() {
    if(this.props.error) {
      return (
        <Card>
          <CardText>
            {this.props.error.message}
          </CardText>
        </Card>
      );
    } else {
      return '';
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title={'Login'}
          showMenuIconButton={false} />
        <Card>
          <CardText>
            <TextField
              hintText={'e-mail'}
              style={blockStyle}
              type='email'
              value={this.state.email}
              errorText={this.state.emailError}
              onChange={this.handleEmailChange}
            />
            <TextField
              hintText={'Password'}
              style={blockStyle}
              type='password'
              value={this.state.password}
              errorText={this.state.passwordError}
              onChange={this.handlePasswordChange}
            />
            <RaisedButton
              label={'Log in'}
              style={mainButtonStyle}
              primary={true}
              onClick={this.loginButtonClicked}
              disabled={this.buttonShouldBeDisabled()} />

          </CardText>
        </Card>

        {this.getServerError()}

        <Card>
          <CardText>
            <p>New to RecoReco?</p>
              <Link
                to={'signup'}
              >
                <RaisedButton
                  label={'Sign up!'}
                  primary={true}/>
              </Link>
          </CardText>
        </Card>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    error: getLoginError(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLoginButtonClicked: (email, password) => {
      dispatch(authActions.signInWithEmailAndPassword(email, password)).then(() => {
        browserHistory.push('/');
      });
    }
  };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
