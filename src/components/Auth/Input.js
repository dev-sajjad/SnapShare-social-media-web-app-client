import React from 'react';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({name, handleChange, autoFocus, handleShowPassword, type, label, half}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                type={type}
                size="small"
                onChange={handleChange}
                autoFocus ={ autoFocus}
                variant="outlined"
                fullWidth
                required
                InputProps={name === 'password' && {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} >
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>    
                    )
                }}
            />
      </Grid>
    );
};

export default Input;