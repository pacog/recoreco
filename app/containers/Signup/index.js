import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as EmailValidator from 'email-validator';
import { authActions } from '../../core/auth';
import { getSignupError } from '../../core/auth/selectors';
import { Card, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 255;

const emptyState = { email: '', password: '', emailError: false, passwordError: false };

const mainButtonStyle = {
  display: 'block',
  marginTop: 20
};

const blockStyle = {
  display: 'block'
};

class Signup extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor({ error, dispatchSignupButtonClicked }) {
    super();
    this.state = {
      ...emptyState,
      error
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signupButtonClicked = this.signupButtonClicked.bind(this);
    this.buttonShouldBeDisabled = this.buttonShouldBeDisabled.bind(this);
    this.dispatchSignupButtonClicked = dispatchSignupButtonClicked;
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
    } else if(password.length < MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    } else if(password.length > MAX_PASSWORD_LENGTH) {
      return `Password is too long`;
    } else {
      return false;
    }
  }

  //TODO: extract to component and reuse in login
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

  signupButtonClicked() {
    this.dispatchSignupButtonClicked(this.state.email, this.state.password);
  }

  buttonShouldBeDisabled() {
    return !!(this.state.emailError || this.state.passwordError);
  }

  render() {
    return (
      <div>
        <AppBar
          title={'Signup'}
          showMenuIconButton={false} />
        <Card>
          <CardText>
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
                label={'Sign up'}
                style={mainButtonStyle}
                primary={true}
                onClick={this.signupButtonClicked}
                disabled={this.buttonShouldBeDisabled()} />

            </CardText>
          </CardText>
        </Card>
        {this.getServerError()}
        <Card>
          <CardText>
            <p>Already have an account?</p>
              <Link
                to={'login'}
              >
                <RaisedButton
                  label={'Log in!'}
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
    error: getSignupError(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignupButtonClicked: (email, password) => {
      dispatch(authActions.signUpWithEmailAndPassword(email, password)).then(() => {
        browserHistory.push('/');
      });
    }
  };
};

const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default SignupContainer;
