import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    text: '',
    idTimeout: Date.now(),
};

const filterSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationText(state, action) {
            return {
                text: action.payload.text,
            };
        },
        cleanNotification(state, action) {
            return 
        }
    },
});

export const { setNotificationText } = filterSlice.actions;
export default filterSlice.reducer;