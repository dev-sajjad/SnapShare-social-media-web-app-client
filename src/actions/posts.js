import * as api from '../api';

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const response = await api.fetchPosts();
        const data = response.data;

        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message)
    }
   
}