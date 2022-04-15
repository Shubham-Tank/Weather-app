import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchCities = ({ cities, onCityChange }) => {

	return (
		<div className='input-container'>
			<Autocomplete
				id='city-select'
				sx={{ width: 300 }}
				options={cities}
				onChange={(event, newValue) => {
					if (newValue)
						onCityChange(newValue)
				}}
				autoHighlight
				getOptionLabel={(option) => option}
				renderOption={(props, option) => (
					<Box style={{ color: 'rgb(8, 8, 39)' }} component="li" {...props}>
						{option}
					</Box>
				)}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Choose a city"
						inputProps={{
							...params.inputProps
						}}
					/>
				)}
			/>
		</div>

	);
}

export default SearchCities