import {
  CREATE_QUESTIONS_SUCCESS,
  CREATE_QUESTION_PAPER_SUCCESS,
  DELETE_QUESTIONS_SUCCESS,
  ERROR,
  GET_ALL_PAPERS_SUCCESS,
  GET_ALL_QUESTION_SUCCESS,
  GET_ALL_USER_RESULT_SUCCESS,
  GET_PAPER_BY_ID_SUCCESS,
  GET_USER_RESULT_SUCCESS,
  USER_SUBMIT_PAPER_SUCCESS,
} from "../actionTypes";

const initialState = {
  data: [],
  newQuestionData: [],
  message: "",
  allQuestion: [],
  PAPER: [],
  allPapers: [],
  submit: [],
  result: [],
  allResult: [],
  paperId: [],
  deletedQuestion:"",
};

const paperReducer = (state = initialState, action) => {
  console.log(action.payload, "paperId");
  switch (action.type) {
    case GET_ALL_PAPERS_SUCCESS:
      return {
        ...state,
        allPapers: action.payload,
        error: false,
      };

    case CREATE_QUESTIONS_SUCCESS:
      return {
        ...state,
        // newQuestionData: [...state.newQuestionData, ...action.payload],
        newQuestionData: action.payload,
        error: false,
      };
    case DELETE_QUESTIONS_SUCCESS:
      // debugger;
      return {
        ...state,
        deletedQuestion: action.payload.message,
        error: false,
      };

    case GET_ALL_QUESTION_SUCCESS:
      return {
        ...state,
        allQuestion: action.payload,
        error: false,
      };
    case CREATE_QUESTION_PAPER_SUCCESS:
      return {
        ...state,
        PAPER: action.payload,
        error: false,
      };
    case USER_SUBMIT_PAPER_SUCCESS:
      return {
        ...state,
        submit: action.payload,
        error: false,
      };
    case GET_USER_RESULT_SUCCESS:
      return {
        ...state,
        result: action.payload,
        error: false,
      };
    case GET_ALL_USER_RESULT_SUCCESS:
      // debugger;
      return {
        ...state,
        allResult: action.payload,
        error: false,
      };
    case GET_PAPER_BY_ID_SUCCESS:
      return {
        ...state,
        paperId: action.payload,
        error: false,
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

export default paperReducer;
