import { createStore } from "redux";

import rootReduders from './reducers'
import { setCoins } from "./actions/coins";


const store = createStore(rootReduders);
window.store = store;
export default store;
