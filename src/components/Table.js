import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { wallet } = this.props;
    return (
      <div>

        <table className="table">
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
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
                  className="btn btn-danger mx-3"
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
