import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionSubmitLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { loginDispatch } = this.props;
    const { email } = this.state;
    event.preventDefault();
    loginDispatch(email);
    this.setState({ redirect: true });
  }

  render() {
    const { email, password, redirect } = this.state;
    const regexValidation = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const passwordLength = 6;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            onChange={ (event) => this.setState({ email: event.target.value }) }
            value={ email }
            placeholder="Email"
          />
          <input
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ (event) => this.setState({ password: event.target.value }) }
          />
          <button
            type="button"
            onClick={ this.handleClick }
            disabled={ password.length < passwordLength || !regexValidation.test(email) }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email) => dispatch(actionSubmitLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
