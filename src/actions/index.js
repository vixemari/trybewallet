// Coloque aqui suas actions
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SUBMIT_WALLET = 'SUBMIT_WALLET';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const eating = 'Alimentação';

export const actionSubmitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

export const actionSubmitWallet = (payload) => ({
  type: SUBMIT_WALLET,
  payload,
});

export const actionAddCurrencies = (payload) => ({
  type: ADD_CURRENCIES,
  payload,
});

export const actionAddExpenses = (exchangeRates, state) => ({
  type: ADD_EXPENSES,
  payload: {
    ...state,
    exchangeRates,
  },
});

export function fetchCurrencyAPI() {
  return async (dispatch) => {
    const currencyFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencyJSON = await currencyFetch.json();
    const currencyKeys = Object.keys(currencyJSON);
    const currencyList = currencyKeys.filter((currency) => currency !== 'USDT');
    dispatch(actionAddCurrencies(currencyList));
  };
}

export function fetchExpense(state) {
  return async (dispatch) => {
    const currencyFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencyJSON = await currencyFetch.json();
    dispatch(actionAddExpenses(currencyJSON, state));
  };
}

export function converted(expenses) {
  if (expenses.length === 0) {
    return 0;
  }
  const total = expenses.reduce((acumulator, currentValue) => {
    const rates = currentValue.exchangeRates[currentValue.currency];
    return acumulator + Number(currentValue.value) * rates.ask;
  }, 0);
  return Math.round(total * 100) / 100;
}
