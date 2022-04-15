import axios from 'axios'
import React, { useEffect, useState } from 'react'
import urls from '../apiUrls'
import SearchContries from './SearchContries'

const Search = () => {

    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')

    const [allCountries, setAllCountries] = useState([])
    const [cityList, setCityList] = useState([])

    const fetchCountries = async () => {
        const response = await axios.get(urls.countries)
        setAllCountries(response.data.data)
    }

    useEffect(() => {
        fetchCountries()
    }, [])


    return (
        <section className='search'>
            <SearchContries onCountryChange={(value) => setCountry(value)} countries={allCountries} />
        </section>
    )
}

export default Search