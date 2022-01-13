// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SUBMIT_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT_LOGIN:
    return { ...state,
      email: action.payload,
      password: action.payload,
    };
  default:
    return state;
  }
}
export default userReducer;
