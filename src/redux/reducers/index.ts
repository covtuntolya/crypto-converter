import { combineReducers } from "redux";

import coinsReducer from "./coins";
import converterReducer from "./converter";
// import pizzasReducer from "./pizzas";
// import cart from "./cart"; // es6 позволяет добавлять редьюсеры более простым способом

const rootReducer = combineReducers({
  coins: coinsReducer,
  converter: converterReducer

  // cart // es6 позволяет добавлять редьюсеры более простым способом, более чистый способ
});

export default rootReducer;
