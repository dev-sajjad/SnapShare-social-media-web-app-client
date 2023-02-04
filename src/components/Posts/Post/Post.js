import { Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          alt="player"
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6"> {post.creator}</Typography>
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
            startIcon={<ThumbUpAltIcon fontSize="medium" />}
            onClick={() => {
              dispatch(likePost(post._id));
            }}
          >
            Like {post.likeCount}
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