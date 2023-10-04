import {
  AUTH_REGISTER,
  AUTH_LOGIN,
  CREATE_QUESTIONS,
  GET_ALL_QUESTION,
  CREATE_QUESTION_PAPER,
  USER_SUBMIT_PAPER,
  GET_ALL_PAPERS,
  GET_USER_RESULT,
  GET_PAPER_BY_ID,
  GET_ALL_USER_RESULT,
  DELETE_QUESTIONS,
  GOOGLE_SIGNUP,
  GOOGLE_SIGNIN,
} from "../actionTypes";

export const authRegister = (data) => {
  return {
    type: AUTH_REGISTER,
    payload: data,
  };
};

export const authLogin = (data) => {
  // debugger;
  return {
    type: AUTH_LOGIN,
    payload: data,
  };
};
export const googleSignUp = (data) => {
  console.log(data,"google action")
  return {
    type: GOOGLE_SIGNUP,
    payload: data,
  };
};
export const googleSignIn = (data) => {
  return {
    type: GOOGLE_SIGNIN,
    payload: data,
  };
};



export const showPaperById = (id) => {
  console.log(id, "paperbyid");
  return {
    type: GET_PAPER_BY_ID,
    payload: id,
  };
};
export const showAllPapers = () => {
  return {
    type: GET_ALL_PAPERS,
  };
};
export const createQuestion = (data) => {
  console.log(data, "createQuestion");
  return {
    type: CREATE_QUESTIONS,
    payload: data,
  };
};
export const deleteQuestionById = (id) => {
  console.log(id, "deleteQuestionById");
  return {
    type: DELETE_QUESTIONS,
    payload: id,
  };
};

export const createNewQuestionPaper = (data) => {
  console.log(data, "data");
  return {
    type: CREATE_QUESTION_PAPER,
    payload: data,
  };
};
export const userSubmitPaper = (data) => {
  console.log(data, "userAns");
  return {
    type: USER_SUBMIT_PAPER,
    payload: data,
  };
};
export const getResult = () => {
  return {
    type: GET_USER_RESULT,
  };
};
export const getAllResult = () => {
  return {
    type: GET_ALL_USER_RESULT,
  };
};
export const allQuestion = () => {
  return {
    type: GET_ALL_QUESTION,
  };
};
