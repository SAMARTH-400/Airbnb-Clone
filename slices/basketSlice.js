import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    items: [{
    img:"https://links.papareact.com/xqj",
    description:"1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine",
    location:"Private room in center of London",
    price:"£30",
    star:4.73,
    title:"Stay at this spacious Edwardian House"}]
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
        },
    },
});

export const{ addToBasket , removeFromBasket } = basketSlice.actions;
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + (parseInt( item.price.substring(1).split(" ")[0] )), 0);
export default basketSlice.reducer;