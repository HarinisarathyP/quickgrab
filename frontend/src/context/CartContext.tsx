import React, { createContext, useContext, useReducer, type ReactNode } from 'react';

// Define Cart Item Interface
interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  restaurantId?: string;
  restaurantName?: string;
  restaurantImage?: string;
}

// Define State Interface
interface CartState {
  cartItems: CartItem[];
}

// Define Actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; qty: number } }
  | { type: 'CLEAR_CART' };

// Initial State
const initialState: CartState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : [],
};

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // Increment quantity when adding existing item
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? { ...x, qty: x.qty + 1 } : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x._id === action.payload.id ? { ...x, qty: action.payload.qty } : x
        ),
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

// Context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Provider Component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist to local storage
  React.useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => useContext(CartContext);