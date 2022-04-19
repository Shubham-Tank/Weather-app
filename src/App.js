import SearchContries from "./components/SearchContries";
import SearchCities from "./components/SearchCities";
import Weather from "./components/Weather";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import urls from "./apiUrls";

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

	const fetchCountries = async () => {
		const response = await axios.get(urls.countries);
		setLoading(false);
		setAllCountries(response.data.data);
	};

	const fetchCities = async (country) => {
		const response = await axios.get(urls.cities(country), config);
		setCityList(response.data.data);
		setLoading(false);
	};

	const fetchLatLon = async (city) => {
		const response = await axios.get(urls.latLon(city));
		const { lat, lon } = response.data[0];
		setLatLon({ lat, lon });
	};

	useEffect(() => {
		fetchCountries();
	}, []);

	useEffect(() => {
		if (country) {
			fetchCities(country);
			setLoading(true);
		}
		setLatLon({ lat: null, lon: null });

		return () => {
			source.cancel();
		};
	}, [country]);

	useEffect(() => {
		if (city) {
			fetchLatLon(city);
			setLoadingWeather(true);
		}
	}, [city]);

	console.log(loadingWeather);

	return (
		<div className="App">
			<header>
				<h1 className="heading">Weather App</h1>
			</header>
			<SearchContries
				countries={allCountries}
				onCountryChange={(value) => setCountry(value)}
			/>
			<SearchCities
				cities={cityList}
				onCityChange={(value) => setCity(value)}
			/>
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
