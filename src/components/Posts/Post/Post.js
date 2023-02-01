import { Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './styles';

const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    
    return (
        <Card className={classes.card}> 
            <CardMedia className={classes.media} component='image' alt='player' image={post.selectedFile}  title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6' > {post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Tooltip title='edit'>
                    <Button
                        style={{ color: 'white' }}
                        size='small'
                        onClick={() => { 
                        setCurrentId(post._id)
                    }}>
                        <MoreHorizIcon fontSize='default' />
                    </Button>
                </Tooltip>
            </div>
            <div className={classes.details} >
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant = 'h5' gutterBottom>
                    {post.title}
                </Typography>
                <Typography  variant = 'body2' gutterBottom>
                    {post.description}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions} >
                <Button size='small' color='primary' onClick={() => { }}>
                    <ThumbUpAltIcon fontSize='small' />
                    Like
                    {post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={() => { }}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </CardActions>
       </Card>
    );
};

export default Post;