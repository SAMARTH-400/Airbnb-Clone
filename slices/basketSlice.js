import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    items: []
};
export const basketSlice = createSlice({
    name: "basket",
    initialState, 
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex(
                (basketItem) => basketItem.id === action.payload.id
            );
            const newBasket = [...state.items];
            newBasket.splice(index, 1);
            state.items = newBasket;    
        }
    },
});

export const{ addToBasket , removeFromBasket } = basketSlice.actions;
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + (parseInt( item.amount * item.days )), 0);
export default basketSlice.reducer;