// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { SUBMIT_WALLET } from '../actions';
import { ADD_CURRENCIES, ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};
function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: [...action.payload],
    };
  default:
    return state;
  }
}
export default walletReducer;
