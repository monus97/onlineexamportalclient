import {
  AUTH_lOGIN_SUCCUSS,
  AUTH_REGISTER_SUCCUSS,
  GOOGLE_SIGNUP_SUCCUSS,
  GOOGLE_SIGNIN_SUCCUSS,
  ERROR,
} from "../actionTypes";
const initialState = {
  data: [],
  message: "",
  token: "",
  loginData: [],
  logindata:null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REGISTER_SUCCUSS:
      return {
        ...state,
        data: action.payload,
        error: false,
      };

    case ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
      };

    case AUTH_lOGIN_SUCCUSS:
      localStorage.setItem(
        "role",
        JSON.stringify(action.payload.userDetails.role)
      );
      localStorage.setItem(
        "name",
        JSON.stringify(action.payload.userDetails.name)
      );
      return {
        ...state,
        token: action.payload.token,
        loginData: action.payload,
        error: false,
      };
    case  GOOGLE_SIGNUP_SUCCUSS:
      localStorage.setItem(
        "role",
        JSON.stringify(action.payload.data.role)
      );
      localStorage.setItem(
        "name",
        JSON.stringify(action.payload.data.name)
      );
      return {
        ...state,
        token: action.payload.data.token,
        logindata: action.payload,
        error: false,
      };

    default:
      return state;
  }
};

export default authReducer;
