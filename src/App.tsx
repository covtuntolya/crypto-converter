import "./styles.css";

import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { CryptoTable, ConverterBlock } from "./components";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

export default function App() {
  const { items } = useSelector(({ coins }) => {
    return {
      items: coins.items
    };
  });

  return (
    <Container style={{ marginTop: 30 }} maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Item>
            <CryptoTable />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <ConverterBlock items={items} />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}

// React.useEffect(() => {
//   axios
//     .get(
//       "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=7&tsym=USD"
//     )
//     .then(({ data }) => {
//       const coins: TCoin[] = data.Data.map((coin: any) => {
//         const obj: TCoin = {
//           name: coin.CoinInfo.Name,
//           fullName: coin.CoinInfo.FullName,
//           imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
//           price: coin.RAW.USD.PRICE.toFixed(2),
//           volume24Hour: parseInt(coin.RAW.USD.VOLUME24HOUR)
//         };
//         return obj;
//       });

//       setAllCoins(coins);
//     });
// }, []);
