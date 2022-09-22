import { GET_COUNTRIES } from "./actions";

let initialState = {
  countries: [],
  activities: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    default:
      return state;
  }
};

// console.log(initialState.countries);

export default rootReducer;
