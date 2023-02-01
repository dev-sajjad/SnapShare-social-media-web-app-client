import { Button, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    description: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();

 




  // convert file to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPostData({ ...postData, selectedFile: reader.result });
        console.log(reader.result);
      };
    }
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData))
    } else {
      dispatch(createPost(postData));
    }
    
  };

  // handle clear form
  const clear = () => {};

  return (
    <div>
      <Paper className={classes.paper}>
        <form
          noValidate
          className={`${classes.form}`}
          autoComplete="false"
          onSubmit={handleSubmit}
        >
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            margin="normal"
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          ></TextField>
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
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          ></TextField>
          <TextField
            type="file"
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