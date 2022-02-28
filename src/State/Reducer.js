export const initialState = {
  basket: [],
  user: null
}

// Reduce(), what it does is it iterates through the basket and tally ups (sums up) the item.price  
// amount is the initial amount = £0
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);


const reducer = (state, action) => {              // state is the current state of the app
  switch(action.type) {

      case 'EmptyBasket':
          return {...state, 
                  basket: []
                 }

      case 'AddToBasket':
      return {
          ...state,                               // return whatever the state is
          basket: [...state.basket, action.item]  // return the current state of the basket plus the new item
      }

      case 'RemoveFromBasket':                    // "findIndex()" will find the first one and return just that one to you
          const findIndex = state.basket.findIndex((basketItem) => basketItem.id === action.id);
          let newBasket = [...state.basket];

          if (findIndex >= 0) {                   // we found the item in the index
              newBasket.splice(findIndex,1)       // removes THAT index by 1 from the array (basket)
          }else {
              console.warn(`Can't remove product id ${action.id} as it's not in the basket.`);
          }
          return {
              ...state,
              basket: newBasket
          }

      case 'SetUser':
          return {
              ...state,
              user: action.user
          }
      default:
          return state;
  }
}

export default reducer;
