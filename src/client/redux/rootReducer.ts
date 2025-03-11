import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import userReducer from "./features/userSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
