import React, { useState } from "react";
import { AppBar,Button,Container, Grid, Grow, Paper, TextField  } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';


import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { getPostsBySearch } from "../../actions/posts"; 
import Paginate from "../Pagination/Paginate";
import useStyles from "./styles";


// handle url params
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  // handle pagination
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;

  // handle search field
  const serachQuery = query.get("serachQuery");
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);


  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search: search? search : 'none', tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchPost();
    }
  }
  const handleAdd = (tag) =>  setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position = "static" color="inherit" >
              <TextField
                name="search"
                variant="outlined"
                label="Search Snaps"
                onKeyDown={handleKeyDown}
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: '10px 0px' }}
                value={tags}
                onAdd={ handleAdd}
                onDelete={ handleDelete}
                variant="outlined"
                label="Search Tags"
              />
              <Button onClick={searchPost} variant='contained' color="primary" >Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
