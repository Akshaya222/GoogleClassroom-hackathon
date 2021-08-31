import { GET_ALL_CLASSES } from "../actions/class";
import { GET_FULL_INFO,SET_SELECTEDCLASS_ID } from "../actions/classwork";
import { ADD_USER } from "../actions/user";

const initialState = {
  classes: {},
  selectedClass: {},
  user: {},
  selectedClassId:null,
  openCreateClass:false,
  openJoinClass:false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CLASSES:
      return {
        ...state,
        classes: action.payload
      };
    case SET_SELECTEDCLASS_ID:
      return  {
        ...state,
        selectedClassId:action.payload
      }
    case GET_FULL_INFO:
      console.log("came here now.....")
      return {
        ...state,
        selectedClass: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case "OPEN_CREATE_BOX":
      console.log("reducer for create")
      return {
        ...state,
        openCreateClass:action.payload
      }
      case "OPEN_JOIN_BOX":
        return {
          ...state,
          openJoinClass:action.payload
        }
    default:
      return state;
  }
};

export default reducer;
