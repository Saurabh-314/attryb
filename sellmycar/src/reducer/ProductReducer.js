const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_LOGIN_USER":
      return {
        ...state,
        userId: action.payload._id,
        roll: action.payload.roll,
        isloggedIn: true,
      };
    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case "SET_LOGOUT":
      return {
        ...state,
        isloggedIn: false
      }
    default:
      return state;
  }
}

export default ProductReducer;