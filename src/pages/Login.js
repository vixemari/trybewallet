import React from 'react';
import { Redirect } from 'react-router';

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
    event.preventDefault();
    this.setState({ redirect: true });
  }

  render() {
    const regexValidation = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const passwordLength = 6;
    const { email, password, redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div>
        <form>
          <input
            data-testid="email-input"
            type="email"
            placeholder="name@name.com.br"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            onSubmit={ this.handleClick }
            disabled={ password.length < passwordLength || regexValidation.test(email) }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}
export default Login;
