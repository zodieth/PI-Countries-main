import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";

export const getCountries = () => {
  return async (dispatch) => {
    let countriesDB = await axios.get("http://localhost:3001/countries");
    dispatch({ type: GET_COUNTRIES, payload: countriesDB.data });
    // return fetch("http://localhost:3001/countries")
    //   .then((res) => res.json())
    //   .then((json) =>
    //     dispatch({ type: GET_COUNTRIES, payload: json }, console.log(json))
    //   );
  };
};
