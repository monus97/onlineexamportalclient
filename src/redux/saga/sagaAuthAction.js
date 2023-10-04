import { put, takeLatest, all, call } from "redux-saga/effects";
import authInstance from "../../api/apiConfig";
import {
  AUTH_LOGIN,
  AUTH_lOGIN_SUCCUSS,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCUSS,
  CREATE_QUESTIONS,
  CREATE_QUESTIONS_SUCCESS,
  CREATE_QUESTION_PAPER,
  CREATE_QUESTION_PAPER_SUCCESS,
  CREATE_SKILL,
  CREATE_SKILL_SUCCESS,
  DELETE_QUESTIONS,
  DELETE_QUESTIONS_SUCCESS,
  ERROR,
  GET_ALL_PAPERS,
  GET_ALL_PAPERS_SUCCESS,
  GET_ALL_QUESTION,
  GET_ALL_QUESTIONS_BY_SKILL,
  GET_ALL_QUESTIONS_BY_SKILL_SUCCESS,
  GET_ALL_QUESTION_SUCCESS,
  GET_ALL_USER_RESULT,
  GET_ALL_USER_RESULT_SUCCESS,
  GET_PAPER_BY_ID,
  GET_PAPER_BY_ID_SUCCESS,
  GET_SKILL,
  GET_SKILL_SUCCESS,
  GET_USER_RESULT,
  GET_USER_RESULT_SUCCESS,
  GOOGLE_SIGNIN,
  GOOGLE_SIGNIN_SUCCUSS,
  GOOGLE_SIGNUP,
  GOOGLE_SIGNUP_SUCCUSS,
  USER_SUBMIT_PAPER,
  USER_SUBMIT_PAPER_SUCCESS,
} from "../actionTypes";

function* AuthRegister(action) {
  try {
    //  debugger;
    const response = yield call(
      authInstance.post,
      "user/register",
      action.payload
    );
    yield put({
      type: AUTH_REGISTER_SUCCUSS,
      payload: response,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* AuthGoogleSignUp(action) {
  try {
    const response = yield call(
      authInstance.post,
      "user/google-login",
      action.payload
    );
    yield put({
      type: GOOGLE_SIGNUP_SUCCUSS,
      payload: response,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* AuthGoogleSignIn(action) {
  try {
    //  debugger;
    const response = yield call(
      authInstance.post,
      "user/google-login",
      action.payload
    );
    yield put({
      type: GOOGLE_SIGNIN_SUCCUSS,
      payload: response,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}

function* createQuezAndOptions(action) {
  try {
    const response = yield call(
      authInstance.post,
      "question/add",
      action.payload
    );
    console.log(response, "api res");
    yield put({
      type: CREATE_QUESTIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // console.log(error, "api res");
    const err = error.response.data.error;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* AuthLogin(action) {
  try {
    const response = yield call(
      authInstance.post,
      "user/login",
      action.payload
    );
    yield put({
      type: AUTH_lOGIN_SUCCUSS,
      payload: response.data,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}

function* createPaper(action) {
  try {
    const response = yield call(
      authInstance.post,
      "question/createPaper",
      action.payload
    );
    yield put({
      type: CREATE_QUESTION_PAPER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* submitPaper(action) {
  console.log(action.payload);
  try {
    const response = yield call(
      authInstance.post,
      "question/submitanswer",
      action.payload
    );
    yield put({
      type: USER_SUBMIT_PAPER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* getUserResult(action) {
  try {
    const response = yield call(authInstance.get, "question/result");
    console.log(response, "response,getUserResult");
    yield put({
      type: GET_USER_RESULT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const err = error.response.data.message;
    // console.log(err, "error");
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* getAllUserResult(action) {
  // debugger;
  try {
    const response = yield call(authInstance.get, "question/allresults");
    console.log(response, "response,allresults");
    yield put({
      type: GET_ALL_USER_RESULT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const err = error.response.data.message;
    // console.log(err, "error");
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* getPaperById(action) {
  console.log(action.payload, "action.payload from getPaperByID");
  // debugger;
  try {
    const response = yield call(
      authInstance.get,
      `question/getpaperbyId/${action.payload}`
    );
    console.log(response, "getPaperById");
    yield put({
      type: GET_PAPER_BY_ID_SUCCESS,
      payload: response.data.paper,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* deleteQuestionById(action) {
  console.log(action.payload, "action.payload from getPaperByID");
  //  debugger;
  try {
    const response = yield call(
      authInstance.delete,
      `question/delete/${action.payload}`
    );
    console.log(response, "getPaperById");
    yield put({
      type: DELETE_QUESTIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* getAllPapersData(action) {
  try {
    const response = yield call(authInstance.get, "question/getallpaper");
    console.log(response, "saga");
    yield put({
      type: GET_ALL_PAPERS_SUCCESS,
      payload: response.data.paper,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* getAllQuestion(action) {
  try {
    const response = yield call(authInstance.get, "question/getallquestions");
    console.log(response, "saga");
    yield put({
      type: GET_ALL_QUESTION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}


//    ===================== SKILL =================
function* createSkills(action) {
  try {
    // debugger;
    const response = yield call(
      authInstance.post,
      "question/skill",
      action.payload
    );
    yield put({
      type: CREATE_SKILL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}

function* getSkills(action) {
  try {
    // debugger;
    const response = yield call(authInstance.get, "question/skill");
    console.log(response, "saga");
    yield put({
      type: GET_SKILL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* getQuestionsBySkills(action) {
  try {
    //  debugger;
    const response = yield call(authInstance.get, `question/skill/${action.payload}`);
    console.log(response, "saga");
    yield put({
      type: GET_ALL_QUESTIONS_BY_SKILL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}
function* actionWatcher() {
  yield takeLatest(AUTH_REGISTER, AuthRegister);
  yield takeLatest(AUTH_LOGIN, AuthLogin);
  yield takeLatest(GOOGLE_SIGNUP, AuthGoogleSignUp);
  yield takeLatest(GOOGLE_SIGNIN, AuthGoogleSignIn);
  yield takeLatest(GET_PAPER_BY_ID, getPaperById);
  yield takeLatest(GET_ALL_PAPERS, getAllPapersData);
  yield takeLatest(CREATE_QUESTIONS, createQuezAndOptions);
  yield takeLatest(DELETE_QUESTIONS, deleteQuestionById);
  yield takeLatest(GET_ALL_QUESTION, getAllQuestion);
  yield takeLatest(CREATE_QUESTION_PAPER, createPaper);
  yield takeLatest(USER_SUBMIT_PAPER, submitPaper);
  yield takeLatest(GET_USER_RESULT, getUserResult);
  yield takeLatest(GET_ALL_USER_RESULT, getAllUserResult);

  // ================skill=====================
  yield takeLatest(CREATE_SKILL, createSkills);
  yield takeLatest(GET_SKILL, getSkills);
  yield takeLatest(GET_ALL_QUESTIONS_BY_SKILL, getQuestionsBySkills);

}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
