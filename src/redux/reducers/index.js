import { combineReducers } from "redux";
import authReducer from "./authReducer";
import paperReducer from "./paperReducer";
import skillReducer from "./skillReducer";
const rootReducer = combineReducers({
  authReducer,
  paperReducer,
  skillReducer,
});
export default rootReducer;
