import axios from 'axios'
import React, { useEffect, useState } from 'react'
import urls from '../apiUrls'
import SearchContries from './SearchContries'
import SearchCities from './SearchCities'
import Weather from './Weather'

const Search = () => {

    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [latLon, setLatLon] = useState({ lat: null, lon: null })

    const [allCountries, setAllCountries] = useState([])
    const [cityList, setCityList] = useState([])

    let source = axios.CancelToken.source()
    let config = { cancelToken: source.token }

    const fetchCountries = async () => {
        const response = await axios.get(urls.countries)
        setAllCountries(response.data.data)
    }

    const fetchCities = async (country) => {
        const response = await axios.post(urls.cities, {
            "country": country.toLowerCase()
        }, config)
        setCityList(response.data.data)
    }

    const fetchLatLon = async (city) => {
        const response = await axios.get(urls.latLon(city))
        const { lat, lon } = response.data[0]
        setLatLon({ lat, lon })
    }

    useEffect(() => {
        fetchCountries()
    }, [])

    useEffect(() => {
        if (country)
            fetchCities(country)

        return () => {
            source.cancel()
        }
    }, [country])

    useEffect(() => {
        if (city)
            fetchLatLon(city)
    }, [city])

    return (
        <section className='search'>
            <header>
                <h1 className='heading'>Weather App</h1>
            </header>
            <SearchContries countries={allCountries} onCountryChange={(value) => setCountry(value)} />
            <SearchCities cities={cityList} onCityChange={(value) => setCity(value)} />
            {latLon.lat && <Weather {...latLon} />}
        </section>
    )
}

export default Search