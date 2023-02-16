import React, { useRef, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { commentOnPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const { post } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef();

    const handleComment = async() => {
        const finalComment = `${currentUser.displayName} : ${comment}`;

        const newComments = await dispatch(commentOnPost(finalComment, post._id))
        setComments(newComments);
        setComment('');

        // auto scroll to bottom
        commentsRef.current.scrollIntoView({behavior: 'smooth'})
    }

    return (
    <div>
        <div className={classes.commentsOuterContainer}>
            <div>
                <Typography variant='h6' gutterBottom >Comments:</Typography>
                <div className={classes.commentsInnerContainer}>
                    {comments.map((comment, index) => (
                        <Typography variant='div' gutterBottom>
                            <Typography variant='subtitle1'  style={{color: 'coral', fontSize: '15px', fontFamily: 'sans-serif'}} >{comment.split(':')[0]}</Typography>
                            <Typography variant='p' marginTop='-5px' >{comment.split(':')[1]}</Typography>
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
            </div> 
                {/* comment field */}
                {!currentUser?.email ?
                    (<Typography variant='h6' color='maroon' marginTop='20px' >Please Sign In to comment on Snap!</Typography>)
                    :
                    (<div style={{ width: '60%', marginTop: '20px' }}>
                    <Typography variant='h6' gutterBottom >Write a comment:</Typography>
                    <TextField
                        fullWidth
                        multiline
                        variant='outlined'
                        label='Comment'
                        placeholder='comment here ...'
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} 
                    />
                    <Button style={{marginTop: '10px'}} variant='contained' color='primary' disabled={!comment} onClick={handleComment} >Comment</Button>
                </div>)}   
        </div>
    </div>
    );
};

export default CommentSection;