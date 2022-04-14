import React, { useState } from 'react'

const SearchContries = ({ country, allCountries, onCountryChange }) => {

    const [focus, setFocus] = useState(false)

    return (
        <div className='country'>
            <input onFocus={() => setFocus(true)} type="text" value={country} onChange={(e) => onCountryChange(e.target.value)} className="form-control input-country" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1" />

            {focus &&
                <select value={country} readOnly={true}
                    onClick={(e) => {
                        onCountryChange(e.target.value)
                        setFocus(false)
                    }}
                    className="form-select country-list" size="3">
                    {
                        allCountries
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

export default SearchContries