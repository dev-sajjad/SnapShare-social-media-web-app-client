import * as actions from "../constants/actionTypes";

export const posts =((posts = [], action) => {
    switch (action.type) {
        case actions.DELETE:
            return posts.filter((post) => post._id !== action.payload.id);
        case actions.UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case actions.FETCH_ALL:
            return action.payload;
        case actions.CREATE:
            return [...posts, action.payload];
        default:
            return posts;
    } 
})