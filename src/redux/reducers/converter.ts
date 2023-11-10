const initialState = {
  form1: {
    name: "",
    val: 0,
    price: 0
  },
  form2: {
    name: "",
    val: 0,
    price: 0
  }
};

const converterReducer = (state = initialState, action) => {
  // console.log(state);
  switch (action.type) {
    case "SET_CONVERTER1": {
      return {
        ...state,
        form1: {
          ...state.form1,
          name: action.payload.name,
          price: action.payload.price
        }
      };
    }

    case "SET_CONVERTER2": {
      return {
        ...state,
        form2: {
          ...state.form2,
          name: action.payload.name,
          price: action.payload.price
        }
      };
    }

    case "SET_CONVERTER_VAL1": {
      return {
        ...state,
        form1: {
          ...state.form1,
          val: action.payload
        }
      };
    }

    case "SET_CONVERTER_VAL2": {
      return {
        ...state,
        form2: {
          ...state.form2,
          val: action.payload
        }
      };
    }
    default:
      return state;
  }
};

export default converterReducer;
