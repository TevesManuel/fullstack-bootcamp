/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';

const initialState = {
    content: null,
    lastTime: null
};

const notificationReducer = (state=initialState, action) => {
    switch (action.type) {
    case 'SET':
        return action.payload;
    case 'RESET':
    {
        if((Date.now() - state.lastTime) >= 5000)
            return initialState;
        return state;
    }
    default:
        return state;
    }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, initialState);

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch] }>
            {props.children}
        </NotificationContext.Provider>
    );
};

import { useContext } from 'react';

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[0];
};
export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[1];
};

export default NotificationContext;