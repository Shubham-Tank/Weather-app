import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchCities = ({ cities, onCityChange }) => {

	return (
		<form>
			<Autocomplete
				id='city-select'
				sx={{ width: 300 }}
				options={cities}
				onChange={(event, newValue) => {
					onCityChange(newValue.name)
				}}
				autoHighlight
				getOptionLabel={(option) => option}
				renderOption={(props, option) => (
					<Box style={{ color: 'rgb(8, 8, 39)' }} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
		</form>

	);
}

export default SearchCities