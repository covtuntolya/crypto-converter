import axios from "axios";
import { TCoin } from "../../types";

export const setConverter1 = (coin) => ({
  type: "SET_CONVERTER1",
  payload: coin
});

export const setConverter2 = (coin) => ({
  type: "SET_CONVERTER2",
  payload: coin
});

export const setConverterVal1 = (val) => ({
  type: "SET_CONVERTER_VAL1",
  payload: val
});

export const setConverterVal2 = (val) => ({
  type: "SET_CONVERTER_VAL2",
  payload: val
});
