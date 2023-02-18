import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from 'react-router-dom';

const Form = ({ currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId) : null);
  const {currentUser} = useSelector((state) => state.auth);

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  } , [post])


  // convert img file to base64 url
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPostData({ ...postData, selectedFile: reader.result });
      };
    }
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, {...postData, name: currentUser?.displayName, creator: currentUser?.email }));
    } else {
      dispatch(createPost({ ...postData, name: currentUser?.displayName, creator: currentUser?.email }));
      navigate("/");
    }
    //clear form
    clear();
    // reset file input field
    e.target.file.value = null;
  };

  // handle clear form
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      description: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!currentUser?.email) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center' >
          Please Sign In to create your own snap and like other's snap!
        </Typography>
      </Paper>
    )
  }


  return (
    <div>
      <Paper className={classes.paper} elevation={6} >
        <Typography align='center'  variant='h6'>{`${currentId ? `Editing ${currentUser?.displayName?.split(' ')[0]}'s` : 'Creating a'}  Snap`}</Typography>
        <form
          noValidate
          className={`${classes.form}`}
          autoComplete="false"
          onSubmit={handleSubmit}
        >
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            margin="normal"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          ></TextField>
          <TextField
            name="description"
            variant="outlined"
            label="Description"
            margin="normal"
            fullWidth
            value={postData.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
          ></TextField>
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            margin="normal"
            fullWidth
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
          ></TextField>
          <TextField
            type="file"
            name= "file"
            className={classes.fileInput}
            InputProps={{ disableUnderline: true }}
            fullWidth
            onChange={handleFileChange}
          ></TextField>
          <Button
            className={classes.buttonSubmit}
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            fullWidth
          >
            Submit
          </Button>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Form;
