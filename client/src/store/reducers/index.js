import { GET_ALL_CLASSES } from "../actions/class";
import { GET_FULL_INFO } from "../actions/classwork";
import { ADD_USER } from "../actions/user";

const initialState = {
  classes: [],
  selectedClass: {},
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CLASSES:
      return {
        ...state,
        classes: action.payload
      };
    case GET_FULL_INFO:
      return {
        ...state,
        selectedClass: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
