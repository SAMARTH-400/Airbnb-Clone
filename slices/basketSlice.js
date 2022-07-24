import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    items: [{img:"https://links.papareact.com/xqj",
    description:"1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine",
    location:"Private room in center of London",
    price:"£30 / night",
    star:4.73,
    title:"Stay at this spacious Edwardian House"}],
};
export const basketSlice = createSlice({
    name: "basket",
    initialState, 
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state, action) => {
            
        },
    },
});

export const{ addToBasket , removeFromBasket } = basketSlice.actions;
export const selectItems = (state) => state.basket.items;
export default basketSlice.reducer;