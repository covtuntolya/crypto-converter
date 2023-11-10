import axios from "axios";
import { TCoin } from "../../types";

export const setCoins = (items) => ({
  type: "SET_COINS",
  payload: items
});
