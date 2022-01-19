import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { converted } from '../actions';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const convertedExpenses = converted(expenses);
    return (
      <header>
        <div data-testid="email-field">
          Email:
          {' '}
          { email }
        </div>
        <div data-testid="total-field">
          { convertedExpenses }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});
export default connect(mapStateToProps)(Header);
