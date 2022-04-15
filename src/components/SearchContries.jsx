import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchCountries = ({ countries, onCountryChange }) => {

    return (
        <div>
            <Autocomplete
                id='country-select'
                sx={{ width: 300 }}
                options={countries}
                onChange={(event, newValue) => {
                    onCountryChange(newValue.name)
                }}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box style={{ color: 'rgb(8, 8, 39)' }} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.name}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Choose a country"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />
        </div>
    );
}

export default SearchCountries