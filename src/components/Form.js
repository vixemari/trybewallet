import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencyAPI, fetchExpense, eating } from '../actions/index';
import Select from './Select';
import Table from './Table';

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
      <div className="mb-3">
        <form
          className="d-flex justify-content-around
        align-items-center bg-dark text-white p-2"
        >
          <label htmlFor="value-input" className="form-label">
            Valor:
            <input
              data-testid="value-input"
              id="value"
              name="value"
              onChange={ this.handleChange }
              value={ value }
              className="form-control"
              type="number"
            />
          </label>

          <label className="form-label" htmlFor="description-input">
            Descrição
            <input
              data-testid="description-input"
              id="description"
              name="description"
              onChange={ this.handleChange }
              type="text"
              value={ description }
              className="form-control align-items-center "
            />
          </label>
          <div>
            <Select
              name="currency"
              option={ currencyList }
              onChange={ this.handleChange }
              value={ currency }
              label="Moeda: "
            />
          </div>
          <div>
            <Select
              name="method"
              option={ paymentMethods }
              onChange={ this.handleChange }
              value={ method }
              label="Método de pagamento: "
            />
          </div>
          <div>
            <Select
              name="tag"
              option={ TAGS }
              onChange={ this.handleChange }
              value={ tag }
              label="Tag: "
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mx-3 "
            onClick={ this.handleClick }
          >
            Adicionar Despesa
          </button>
        </form>
        <Table />
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
