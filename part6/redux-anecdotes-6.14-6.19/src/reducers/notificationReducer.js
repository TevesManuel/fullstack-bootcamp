import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    text: null,
    last: null,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        // eslint-disable-next-line no-unused-vars
        cleanNotification(state, action) {
            if( state.last )
            {
                if( (Date.now() - state.last) > 4000 )
                {
                    return initialState;
                }
            }
            return state;
        },
        setNotificationText(state, action) {

            return {
                text: action.payload,
                last: Date.now(),
            };
        }
    },
});

export const { setNotificationText, cleanNotification } = notificationSlice.actions;

// Redux Thunk

export const setNotification = (text, ms) => {
    return async dispatch => {
        dispatch(setNotificationText(text));
        setTimeout(() => dispatch(cleanNotification()), ms);
    };
};

export default notificationSlice.reducer;