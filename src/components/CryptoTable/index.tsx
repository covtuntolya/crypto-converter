import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { setCoins } from "../../redux/actions/coins";
import { setConverter1, setConverter2 } from "../../redux/actions/converter";
import { TCoin } from "../../types";
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const curencyIcon = {
  width: "18px",
  height: "18px"
};

const columnRed = {
  backgroundColor: "#ffdada"
};

const columnGreen = {
  backgroundColor: "#d8ffc4"
};

interface ICryptoTable {
  items: TCoin;
}

function fetchData(dispatch: any) {
  axios
    .get(
      "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=7&tsym=USD"
    )
    .then(({ data }) => {
      const coins: TCoin[] = data.Data.map((coin: any) => {
        const obj: TCoin = {
          name: coin.CoinInfo.Name,
          fullName: coin.CoinInfo.FullName,
          imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
          price: coin.RAW.USD.PRICE.toFixed(2),
          volume24Hour: coin.RAW.USD.VOLUME24HOUR.toFixed()
        };
        return obj;
      });
      dispatch(setCoins(coins));
    });
}

const CryptoTable = () => {
  const { items, diffItems } = useSelector(({ coins }) => {
    return {
      items: coins.items,
      diffItems: coins.diffItem
    };
  });

  const setColumnColor = (name: string) => {
    const objColor =
      (diffItems && diffItems.filter((obj) => obj.name === name)[0]) || "";
    if (objColor) {
      if (objColor.color === "red") {
        return columnRed;
      } else {
        if (objColor.color === "green") {
          return columnGreen;
        }
      }
    }
  };

  const onClickRow = (coin) => {
    dispatch(setConverter1(coin));
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchData(dispatch);
    const setTimer = setInterval(() => {
      fetchData(dispatch);
      // const diffCoint = diffCurrencies(oldCoins, items);

      // setOldCoins(items);
    }, 60000);

    return () => {
      clearInterval(setTimer);
    };
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">NFullNameame</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">volume24hour</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((coin: any) => (
              <TableRow
                hover
                onClick={() => onClickRow(coin)}
                key={coin.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 }
                }}
              >
                <TableCell>
                  <img
                    style={curencyIcon}
                    src={coin.imageUrl}
                    alt="coin icon"
                  />
                </TableCell>
                <TableCell align="left">{coin.name}</TableCell>
                <TableCell align="left">{coin.fullName}</TableCell>
                <TableCell style={setColumnColor(coin.name)} align="left">
                  ${coin.price}
                </TableCell>
                <TableCell align="left">${coin.volume24Hour}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CryptoTable;
