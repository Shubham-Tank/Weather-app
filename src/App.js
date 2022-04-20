import SearchContries from "./components/SearchContries";
import SearchCities from "./components/SearchCities";
import Weather from "./components/Weather";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchCountries, fetchCities, fetchLatLon } from "./api";

function App() {
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [latLon, setLatLon] = useState({ lat: null, lon: null });

	const [loading, setLoading] = useState(true);
	const [loadingWeather, setLoadingWeather] = useState(false);

	const [allCountries, setAllCountries] = useState([]);
	const [cityList, setCityList] = useState([]);

	let source = axios.CancelToken.source();
	let config = { cancelToken: source.token };

	useEffect(() => {
		(async () => {
			const countries = await fetchCountries();
			setLoading(false);
			setAllCountries(countries);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (country) {
				setLoading(true);
				const cities = await fetchCities(country, config);
				setCityList(cities);
				setLoading(false);
			}
			setLatLon({ lat: null, lon: null });
		})();
		setCity("");
		return () => {
			source.cancel();
		};
	}, [country]);

	useEffect(() => {
		(async () => {
			if (city) {
				setLoadingWeather(true);
				const latlon = await fetchLatLon(city);
				setLatLon(latlon);
			}
		})();
	}, [city]);

	return (
		<div className="App">
			<header>
				<h1 className="heading">Weather App</h1>
			</header>
			<SearchContries
				countries={allCountries}
				onCountryChange={(value) => setCountry(value)}
			/>

			{country && (
				<SearchCities
					city={city}
					cities={cityList}
					onCityChange={(value) => setCity(value)}
				/>
			)}

			{loading && (
				<div className="overlay">
					<CircularProgress className="loader" size="4rem" />
				</div>
			)}

			{latLon.lat && (
				<Weather
					{...latLon}
					country={country}
					loadingWeather={loadingWeather}
					setLoadingWeather={setLoadingWeather}
				/>
			)}
		</div>
	);
}

export default App;
