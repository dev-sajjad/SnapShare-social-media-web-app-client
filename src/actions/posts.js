import { toast } from 'react-hot-toast';
import * as api from '../api';
import * as actions from '../constants/actionTypes';

// Action Creators
// get posts
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: actions.START_LOADING})
        const { data } = await api.fetchPost(id);

        dispatch({ type: actions.FETCH_POST, payload: data });
        dispatch({type: actions.END_LOADING})
    } catch (error) {
        toast.error(error.code)
    }
   
}
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: actions.START_LOADING})
        const { data } = await api.fetchPosts(page);

        dispatch({ type: actions.FETCH_ALL, payload: data });
        dispatch({type: actions.END_LOADING})
    } catch (error) {
        toast.error(error.code)
    }
   
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
         dispatch({ type: actions.START_LOADING });
        const { data } = await api.fetchPostsBySearch(searchQuery);
    
        dispatch({ type: actions.FETCH_POSTS_BY_SEARCH, payload: data });
         dispatch({ type: actions.END_LOADING });
        
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
            toast.error('Please Sign In to like a Snap!');
        }
    }
}

// comment on a post
export const commentOnPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);

        dispatch({ type: actions.COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        toast.error(error.code);
    }
}