import { Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

//icons
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.auth);
  
  // manage posts like
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === currentUser?.uid) ? (
        <>
          <ThumbUpAltIcon fontSize="medium" />
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOutlinedIcon fontSize="medium" marginRight = "10px" /> {post.likes.length} {post.likes.length > 1 ? "likes" : "like"}
        </>
      );
    }
  }
    
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          alt="player"
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6"> {post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          <Tooltip title="edit" arrow>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </Tooltip>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <CardContent>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            className={classes.button}
            size="small"
            color="primary"
            fontFamily= "normal"
            onClick={() => {
              dispatch(likePost(post._id));
            }}
          >
            <Likes />
          </Button>
            <Button
            className={classes.button}
            size="small"
            color="primary"
            startIcon={<DeleteIcon fontSize="medium" />}
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    );
};

export default Post;