// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { SUBMIT_WALLET } from '../actions';
import { ADD_EXPENSES, ADD_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSES: // reducer das despesas
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  case ADD_CURRENCIES: // reducer das moedas
    return {
      ...state,
      currencies: [...action.payload],
    };
  default:
    return state;
  }
};

export default walletReducer;
