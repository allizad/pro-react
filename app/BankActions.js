import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

let BankActions = {
  // create an account with an empty value
  createAccount: function(){
    AppDispatcher.dispatch({
      type: bankConstants.CREATED_ACCOUNT,
      ammount: 0
    })
  },

  // @param {number} amount to withdraw
  depositIntoAccount: function(ammount){
    AppDispatcher.dispatch({
      type: bankConstants.DEPOSITED_INTO_ACCOUNT,
      ammount: ammount
    })
  },

  // @param {number} ammount to withdraw
  withdrawFromAccount: function(ammount){
    AppDispatcher.dispatch({
      type: bankConstants.WITHDREW_FROM_ACCOUNT,
      ammount: ammount
    })
  }
}

export default BankActions;
