export const setFilter = (newFilter) => {
    return {
        type: 'FILTER_SET',
        payload: newFilter
    };
};

const reducer = (state = '', action) => {
    if( action.type === 'FILTER_SET' ) {
        return action.payload;
    }

    return state;
};

export default reducer;