import {
  CREATE_SKILL_SUCCESS,
  ERROR,
  GET_ALL_QUESTIONS_BY_SKILL_SUCCESS,
  GET_SKILL_ID,
  GET_SKILL_SUCCESS,
} from "../actionTypes";

const initialState = {
  newSkill: "",
  message: "",
  skill: [],
  skilledQuestions: [],
  skillId: "",
};

const skillReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SKILL_SUCCESS:
      return {
        ...state,
        newSkill: action.payload,
        error: false,
      };
    case GET_SKILL_SUCCESS:
      //   debugger;
      return {
        ...state,
        skill: action.payload.data,
        error: false,
      };
    case GET_ALL_QUESTIONS_BY_SKILL_SUCCESS:
      //   debugger;
      return {
        ...state,
        skilledQuestions: action.payload,
        error: false,
      };
    case GET_SKILL_ID:
      return {
        ...state,
        skillId: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default skillReducer;
