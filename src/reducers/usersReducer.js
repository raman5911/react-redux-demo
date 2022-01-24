const initialState = {
    usersData: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_ALL_USERS':
            return {
                ...state,
                usersData: action.payload
            }
        
        case 'FETCH_USERS':
            return {
                ...state,
                usersData: action.payload
            }

        case 'POST_USER':

            state.usersData.push(action.payload);

            return {
                ...state,
                usersData: state.usersData
            }
    
        default:
            return state;
    }
}

export default usersReducer;