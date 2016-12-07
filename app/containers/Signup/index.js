import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as EmailValidator from 'email-validator';

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
  constructor({ recommenders, dispatchSignupButtonClicked }) {
    super();
    this.state = emptyState;
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignupButtonClicked: (email, password) => {
      console.log('dispatchSignupButtonClicked');
      //TODO: connect to login in DB
      // dispatch(addRecoToDB(name, recommender)).then(() => {
      //   browserHistory.push('/')
      // });
    }
  };
};


const SignupContainer = connect(null, mapDispatchToProps)(Signup);

export default SignupContainer;
