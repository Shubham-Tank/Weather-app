import React from 'react'

const SearchCities = ({ cityList, city, onCityChange }) => {

	const [focus, setFocus] = useState(false)

	return (
		<div className='city'>
			<input onFocus={() => setFocus(true)} type="text" value={city} onChange={(e) => onCountryChange(e.target.value)} className="form-control input-city" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1" />

			{focus &&
				<select value={country} readOnly={true}
					onClick={(e) => {
						onCountryChange(e.target.value)
						setFocus(false)
					}}
					className="form-select country-list" size="3">
					{
						cityList
							.filter(({ name }) => name.toLowerCase().startsWith(country.toLowerCase()))
							.map(({ name }) => (
								<option key={name} value={name}>{name}</option>
							))
					}
				</select>
			}
		</div>
	)
}

export default SearchCities