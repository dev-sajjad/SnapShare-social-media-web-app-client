import React, { useEffect } from 'react';
import { CircularProgress, Divider, Grid, Paper, Typography } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { PhotoProvider, PhotoView } from "react-photo-view";

import useStyles from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';


const PostDetails = () => {
    const dispatch = useDispatch();
    const { post, posts, isLoading } = useSelector((state )=> state.posts);
    const classes = useStyles();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      dispatch(getPost(id));
    }, [id, dispatch]);

  useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post, dispatch]);
    
    if (!post) return null;

  // loading state
    if (isLoading) {
        return <Paper className={classes.loadingPaper}>
            <CircularProgress size='7em' />
        </Paper>
    }

  // recommended posts
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id).slice(0,8)
  const openPost = (_id) => navigate(`/posts/${_id}`);
  
    return (
      <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">
              {post?.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {post?.tags?.map((tag) => `#${tag} `)}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post?.description}
            </Typography>
            <Typography variant="h6">
              Created by:
              <span style={{ color: "coral" }}> {post?.name}</span>
            </Typography>
            <Typography variant="body1" color="red">
              {moment(post?.createdAt).fromNow()}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1">
              <strong>Realtime Chat - coming soon!</strong>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />

            {/** comments section */}
            <CommentSection post={post} />
          </div>
          <div className={classes.imageSection}>
            {/* photo viewer */}
            <PhotoProvider
              speed={() => 800}
              easing={(type) =>
                type === 2
                  ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
                  : "cubic-bezier(0.34, 1.56, 0.64, 1)"
              }
              // scrolling zoom
              toolbarRender={({ onScale, scale }) => {
                return (
                  <>
                    <svg
                      className="PhotoView-Slider__toolbarIcon"
                      onClick={() => onScale(scale + 1)}
                    />
                    <svg
                      className="PhotoView-Slider__toolbarIcon"
                      onClick={() => onScale(scale - 1)}
                    />
                  </>
                );
              }}
            >
              <PhotoView src={post?.selectedFile}>
                <img
                  className={classes.media}
                  style={{ cursor: "pointer" }}
                  src={
                    post?.selectedFile ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                  }
                  alt={post?.title}
                />
              </PhotoView>
            </PhotoProvider>
          </div>
        </div>
        {/** Recommended posts */}
        {recommendedPosts?.length > 0 && (
          <div className={classes.section} style={{ marginTop: "30px" }}>
            <Typography gutterBottom variant="h5">
              You might also like:
            </Typography>
            <Divider />
            <Grid container>
              {recommendedPosts.map(
                ({ title, description, likes, name, selectedFile, _id }) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div
                      style={{
                        margin: "20px",
                        cursor: "pointer",
                        backgroundColor: "#f7f5f5",
                        padding: "15px",
                        borderRadius: "5px",
                      }}
                      onClick={() => openPost(_id)}
                      key={_id}
                    >
                      <Typography variant="h5">{title}</Typography>
                      <Typography
                        variant="subtitle2"
                        style={{
                          fontFamily: "serif",
                          fontSize: "18px",
                          margin: "4px 0",
                          color: "coral",
                        }}
                      >
                        {name}
                      </Typography>
                      <Typography variant="subtitle2" textAlign="justify">
                        {description.slice(0, 110) + "..."}
                      </Typography>
                      <Typography variant="subtitle1">
                        Likes: {likes.length}
                      </Typography>
                      <img
                        src={selectedFile}
                        alt={title}
                        style={{ borderRadius: "10px", maxHeight: "160px" }}
                      />
                    </div>
                  </Grid>
                )
              )}
            </Grid>
          </div>
        )}
      </Paper>
    );
};

export default PostDetails;