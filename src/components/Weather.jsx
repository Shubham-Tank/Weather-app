import axios from 'axios'
import React, { useEffect } from 'react'
import urls from '../apiUrls'

const Weather = ({ lat, lon }) => {

    const fetchWeather = async () => {
        const response = await axios.get(urls.weather(lat, lon))
        console.log(response)
    }

    useEffect(() => {
        fetchWeather()
    })

    return (
        <div>Weather</div>
    )
}

export default Weather