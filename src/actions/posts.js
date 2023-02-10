import { toast } from 'react-hot-toast';
import * as api from '../api';
import * as actions from '../constants/actionTypes';

// Action Creators
// get posts
export const getPosts = () => async (dispatch) => {
    try {
        const response = await api.fetchPosts();
        const data = response.data;

        dispatch({ type: actions.FETCH_ALL, payload: data });
    } catch (error) {
        toast.error(error.code)
    }
   
}


// create posts
export const createPost = (post) => async (dispatch) => {
    try {
        const response = await api.createPost(post);
        const data = response.data;

        dispatch({ type: actions.CREATE , payload: data });
    } catch (error) {
        toast.error(error.code);
    }
}

// update posts
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        
        dispatch({ type: actions.UPDATE , payload: data });
    } catch (error) {
        toast.error(error.code);
    }
}

// delete posts
export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id);

        dispatch({ type: actions.DELETE, payload: { id, data} });
    } catch (error) {
         toast.error(error.code);
    }
}

// like a post 
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: actions.UPDATE, payload: data });
    } catch (error) {
        if (error) {
            toast.error('Please SignIn to like a post!');
        }
    }
}