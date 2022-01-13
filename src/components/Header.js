import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div data-testid="email-field">
          Email
        </div>
        <div data-testid="total-field">
          0
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </header>
    );
  }
}

export default Header;
