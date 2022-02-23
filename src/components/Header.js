import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { converted } from '../actions';
import '../Css.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const convertedExpenses = converted(expenses);
    return (
      <header className="p-3  bg-dark text-white ">
        <div className="d-flex justify-content-md-end ml-1 ">
          <div className="ml-1 font-weight-bold" data-testid="email-field">
            Email:
            {' '}
            { email }
            {'  '}
          </div>
          <div className="ml-3" data-testid="total-field" id="valor">
            { convertedExpenses }
          </div>
          <div className="ml-2" data-testid="header-currency-field" id="valor">
            BRL
          </div>

        </div>
      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
