import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import {MapStore} from 'flux/utils';

class RouteStore extends MapStore {
  reduce(state,action){
    switch (action.type) {
      case constants.CHOOSE_AIRPORT:
        // action.target can be either 'origin' or 'desination'
        // action.code contains the selected airport code
        return state.set(action.target,action.code);
      default:
        return state;
    }
  }
}

// TODO: why do we have to pass in AppDispatcher here?
export default new RouteStore(AppDispatcher);
