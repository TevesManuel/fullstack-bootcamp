import { createContext, useReducer } from 'react';

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return JSON.parse(action.payload);
        case 'LOGIN':
            window.localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        case 'LOGOUT':
            window.localStorage.removeItem('user');
            return null;
        default:
            return state;
    }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null);

    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    );
};

import { useContext } from 'react';

export const useUserValue = () => {
    const userAndDispatch = useContext(UserContext);
    return userAndDispatch[0];
};
export const useUserDispatch = () => {
    const userAndDispatch = useContext(UserContext);
    return userAndDispatch[1];
};

export default UserContext;
