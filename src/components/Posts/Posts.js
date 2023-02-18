import { Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RotatingSquare } from 'react-loader-spinner';

import Post from './Post/Post';
import useStyles from './styles'

const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts)
    
    if(!posts?.length && !isLoading) return 'No Posts';

    return (
        isLoading ? <div className={classes.spinner} >
            <RotatingSquare
                height="150"
                width="150"
                color="white"
                ariaLabel="rotating-square-loading"
                strokeWidth="4"
                visible={true}
                /></div>
            : (
            <Grid container className={classes.mainContainer} alignItems ='stretch' spacing={3} >
                {
                    posts.map((post) => (
                        <Grid key={post._id} item style={{display: 'flex' }} xs={12} sm={12} md={6} lg={4} >
                            <Post post = {post}  setCurrentId = {setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        ));
};

export default Posts;