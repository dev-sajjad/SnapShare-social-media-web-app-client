import * as api from '../api';

// Action Creators
// get posts
export const getPosts = () => async (dispatch) => {
    try {
        const response = await api.fetchPosts();
        const data = response.data;

        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message)
    }
   
}


// create posts
export const createPost = (post) => async (dispatch) => {
    try {
        const response = await api.createPost(post);
        const data = response.data;

        console.log(data);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}