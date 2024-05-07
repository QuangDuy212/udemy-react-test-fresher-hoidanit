import { createSlice } from '@reduxjs/toolkit';


// carts = [
//     {quantity: 1, _id: 'abc,', detail: {_id: 'abc', name: 'def'}},
//     {quantity: 1, _id: '123,', detail: {_id: '123', name: '456'}},
// ]


const initialState = {
    carts: [] // cart info
};


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddBookAction: (state, action) => {
            let carts = state.carts;
            const item = action.payload;

            let isExistIndex = carts.findIndex(c => c._id === item._id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity;
                if (carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity) {
                    carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity;
                }
            } else {
                carts.push(item);
            }
            state.carts = carts;
        },
    },
    extraReducers: (builder) => {
    },
});

export const { doAddBookAction } = orderSlice.actions;

export default orderSlice.reducer;
