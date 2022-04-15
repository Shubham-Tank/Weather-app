import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchCountries = ({ countries, onCountryChange }) => {

    return (
        <div className='input-container'>
            <Autocomplete
                id='country-select'
                sx={{ width: 300 }}
                options={countries}
                onChange={(event, newValue) => {
                    if (newValue)
                        onCountryChange(newValue.name)
                }}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box style={{ color: 'rgb(8, 8, 39)' }} component="li" {...props}>
                        {option.name}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Choose a country"
                        inputProps={{
                            ...params.inputProps
                        }}
                    />
                )}
            />
        </div>
    );
}

export default SearchCountries