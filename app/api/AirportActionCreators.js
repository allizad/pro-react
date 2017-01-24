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

  fetchAirportsError(error){
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_ERROR,
      payload: {error}
    })
  }
};

export default AirportActionCreators;
