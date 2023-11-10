const initialState = {
  items: [],
  diffItem: []
};

function diffCurrencies(arr1: TCoin[], arr2: TCoin[]) {
  return arr1.filter((obj, index) => {
    if (obj.price !== arr2[index].price) {
      return true;
    }
    return false;
  });
}

function getColor(oldPr, newPr) {
  const color = oldPr < newPr ? "green" : "red";

  return color;
}

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COINS": {
      const newItems = {
        ...state,
        items: action.payload
      };

      return {
        ...state,
        items: action.payload,
        diffItem: diffCurrencies(state.items, newItems.items).map(
          (obj, index) => {
            return {
              ...obj,
              color: getColor(
                obj.price,
                newItems.items.filter((newObj) => newObj.name === obj.name)[0]
                  .price
              )
            };
          }
        )
      };
    }

    default:
      return state;
  }
};

export default coinsReducer;
