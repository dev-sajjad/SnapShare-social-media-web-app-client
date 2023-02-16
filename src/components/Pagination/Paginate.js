import React, { useEffect } from 'react';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../actions/posts';
// import useStyles from './styles';

const Paginate = ({ page }) => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, dispatch]);


    return (
      <Stack spacing={2} marginTop="15px" alignItems= 'center' padding={1} >
        <Pagination
          count={numberOfPages}
          page={Number(page) || 1}
          size="medium"
          shape='circular'
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              {...item} component={Link}  to={`/posts?page=${item.page}`}
            />
          )}
        />
      </Stack>
    );
};

export default Paginate;