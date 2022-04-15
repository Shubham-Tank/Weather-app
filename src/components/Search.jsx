import axios from 'axios'
import React, { useEffect, useState } from 'react'
import urls from '../apiUrls'
import SearchContries from './SearchContries'
import SearchCities from './SearchCities'

const Search = () => {

    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')

    const [allCountries, setAllCountries] = useState([])
    const [cityList, setCityList] = useState([])

    const fetchCountries = async () => {
        const response = await axios.get(urls.countries)
        setAllCountries(response.data.data)
    }

    const fetchCities = async (country) => {
        const response = await axios.post(urls.cities, {
            "country": country.toLowerCase()
        })
        setCityList(response.data.data)
    }

    useEffect(() => {
        fetchCountries()
    }, [])

    useEffect(() => {
        if (country)
            fetchCities(country)
    }, [country])

    return (
        <section className='search'>
            <SearchContries countries={allCountries} onCountryChange={(value) => setCountry(value)} />
            <SearchCities cities={cityList} onCityChange={(value) => setCity(value)} />
        </section>
    )
}

export default Search