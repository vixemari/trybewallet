import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionSubmitLogin } from '../actions/index';
import '../Css.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
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
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div
            className="col-autom-auto p-4 border rounded px-5
              shadow-lg bg-body rounded"
          >
            <div className="row justify-content-center align-items-center">
              <img src="https://i.pinimg.com/originals/b0/b7/64/b0b76439e5cd5ef9bab27e83c4fdb2f2.gif" alt="coingif" className="w-25 p-3 mb-3" />
              <h3 className="text-center py-3">TrybeWallet</h3>

            </div>
            <form>
              <input
                type="email"
                data-testid="email-input"
                name="email"
                onChange={ this.handleChange }
                value={ email }
                placeholder="Email"
                className="form-control mb- "
              />
              <input
                type="password"
                placeholder="Senha"
                data-testid="password-input"
                name="password"
                value={ password }
                onChange={ this.handleChange }
                className="form-control mb-3"
              />
              <div className="d-flex justify-content-around">
                <button
                  type="button"
                  onClick={ this.handleClick }
                  disabled={ password.length < passwordLength
                || !regexValidation.test(email) }
                  className="btn btn-success mx-3"
                >
                  Entrar
                </button>
              </div>
            </form>

          </div>
        </div>
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
