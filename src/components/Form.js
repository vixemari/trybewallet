import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencyAPI, fetchExpense, eating } from '../actions/index';
import Select from './Select';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: eating,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  resetstate =() => {
    this.setState({
      value: '',
      currency: 'USD',
      description: '',
      method: 'GET',
      tag: '',

    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { addExpenses } = this.props;
    const { currency, description, method, tag, value } = this.state;
    addExpenses({ currency, description, method, tag, value });
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: eating,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencyList } = this.props;
    const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              data-testid="value-input"
              id="value"
              name="value"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>

          <label htmlFor="description-input">
            Descrição
            <input
              data-testid="description-input"
              id="description"
              name="description"
              onChange={ this.handleChange }
              type="text"
              value={ description }
            />
          </label>

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
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </table>
      </div>
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
