import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { wallet } = this.props;
    return (
      <div>

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
          { wallet.map((value, index) => (
            <tr key={ index }>
              <td>{ value.description }</td>
              <td>{ value.tag }</td>
              <td>{ value.method }</td>
              <td>{ value.value }</td>
              <td>{ value.exchangeRates[value.currency].name }</td>
              <td>
                { Number(value.exchangeRates[value.currency].ask).toFixed(2) }
              </td>
              <td>
                { (Number(value.exchangeRates[value.currency].ask)
              * Number(value.value)).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  wallet: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
