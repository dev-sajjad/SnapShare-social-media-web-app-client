import * as actions from "../constants/actionTypes";

export const posts =((state = [], action) => {
    switch (action.type) {
        case actions.DELETE:
            return state.filter((post) => post._id !== action.payload.id);
        case actions.UPDATE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case actions.FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case actions.FETCH_POSTS_BY_SEARCH:
            return { ...state, posts: action.payload };
        case actions.CREATE:
            return [...state, action.payload];
        default:
            return state;
    } 
})