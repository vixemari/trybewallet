import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencyAPI, fetchExpense } from '../actions/index';
import Input from './Input';
import Select from './Select';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { addExpenses } = this.props;
    addExpenses(this.state);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencyList } = this.props;
    const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

    return (
      <form>
        <Input
          type="number"
          name="value"
          id="value"
          value={ value }
          onChange={ this.handleChange }
          label="Valor"
        />
        <Input
          type="description"
          name="description"
          id="description"
          value={ description }
          onChange={ this.handleChange }
          label="Descrição"
        />
        <Select
          name="currency"
          option={ currencyList }
          onChange={ this.handleChange }
          value={ currency }
          label="Moeda"
        />
        <Select
          name="method"
          option={ paymentMethods }
          onChange={ this.handleChange }
          value={ method }
          label="Método de pagamento"
        />
        <Select
          name="tag"
          option={ TAGS }
          onChange={ this.handleChange }
          value={ tag }
          label="Tag"
        />
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  addExpenses: PropTypes.func.isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  currencyList: PropTypes.arrayOf(PropTypes.any).isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  addExpenses: (state) => dispatch(fetchExpense(state)),
  fetchCurrency: () => dispatch(fetchCurrencyAPI()),
});

const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
