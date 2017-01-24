import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
  fetchAirports: function(){
    fetch('airports.json')
    .then((response) => response.json())
    .then((responseData) => {
      // call airport action creators success action with the parsed data
      AirportActionCreators.fetchAirportsSuccess(responseData);
    })
    .catch((error) => {
      // call the aurport action creators error action with the error object
      AirportActionCreators.fetchAirportsError(error);

    })
  }
}

export default AirCheapAPI;
