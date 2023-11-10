import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { TCoin } from "../../types";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  setConverterVal1,
  setConverterVal2,
  setConverter2
} from "../../redux/actions/converter";

const cryptoInputBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 10
};

const selectStyle = {
  width: 95
};

type TConverterBlock = {
  items: TCoin[];
};

const ConverterBlock: React.FC<TConverterBlock> = ({ items }) => {
  const [selectedOutCoin, setSelectedOutCoin] = React.useState("ETH");
  const dispatch = useDispatch();
  const { name, price } = useSelector(({ converter }) => {
    return {
      name: converter.form1.name,
      price: converter.form1.price
    };
  });
  const { form1, form2 } = useSelector(({ converter }) => {
    return {
      form1: converter.form1,
      form2: converter.form2
    };
  });
  console.log(form1);
  console.log(form2);

  React.useEffect(() => {
    const sum = (form1.val * form1.price) / form2.price;
    dispatch(setConverterVal2(sum));
    console.log(sum);
  }, [form1, form2.name]);

  const handleChange = (e: any) => {
    setSelectedOutCoin(e.target.value);
    {
      dispatch(
        setConverter2(items.filter((obj) => obj.name === e.target.value)[0])
      );
    }
  };

  const onChangeVal1 = (e) => {
    const val = e.target.value;

    if (/^[1-9][0-9]*$/.test(val)) dispatch(setConverterVal1(val));

    // dispatch(setConverterVal2(0));
  };

  // const onChangeVal2 = (e) => {
  //   const val = e.target.value;
  //   dispatch(setConverterVal2(val));
  //   dispatch(setConverterVal1(0));
  // };

  const coins: string[] = items.map((coin) => coin.name);
  //console.log(coins);
  return (
    <>
      <div style={cryptoInputBox}>
        <FormControl>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Сумма"
            variant="outlined"
            value={form1.val}
            onChange={onChangeVal1}
          />
        </FormControl>
        <FormControl>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Валюта
          </InputLabel>
          <Select
            style={selectStyle}
            value={name || "BTC"}
            //     onChange={handleChange}
          >
            {coins.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={cryptoInputBox}>
        <FormControl>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Сумма"
            variant="outlined"
            value={form2.val || 0}
            // onChange={onChangeVal2}
          />
        </FormControl>
        <FormControl>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Валюта
          </InputLabel>
          <Select
            style={selectStyle}
            value={selectedOutCoin || ""}
            onChange={handleChange}
          >
            {coins.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default ConverterBlock;
