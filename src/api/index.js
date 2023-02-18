import axios from 'axios';

const API = axios.create({ baseURL: "https://server-dev-sajjad.vercel.app" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('social-token')) {
        req.headers.authorization = `Bearer ${localStorage.getItem('social-token')}`
    }    
    return req;
})

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}`);

export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

export const verifyToken = (user) => API.post('/jwt', user);