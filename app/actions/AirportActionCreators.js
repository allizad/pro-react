import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/AirCheapAPI';

let AirportActionCreators = {

  fetchAirports: function(){
    AirCheapAPI.fetchAirports();
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS
    })
  },

  fetchAirportsSuccess: function(response){
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORT_SUCCESS,
      payload: {response}
    })
  },

  fetchAirportsError: function(error){
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_ERROR,
      payload: {error}
    })
  },

  chooseAirport: function(target,code){
    AppDispatcher.dispatch({
      type: constants.CHOOSE_AIRPORT,
      target,
      code
    })
  },

  fetchTickets: function(){
    AirCheapAPI.fetchTickets();
    AppDispatcher.dispatch({
      type: constants.FETCH_TICKETS
    })
  },

  fetchTicketsSuccess: function(response){
    AppDispatchers.dispatch({
      type: constants.FETCH_TICKETS_SUCCESS,
      payload: {response}
    })
  },

  fetchTicketsError: function(response){
    AppDispatchers.dispatch({
      type: constants.FETCH_TICKETS_ERROR,
      payload: {response}
    })
  }
};

export default AirportActionCreators;
