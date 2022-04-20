import axios from "axios";

export const fetchCountries = async () => {
	const response = await axios.get(
		"https://countriesnow.space/api/v0.1/countries/iso"
	);
	return response.data.data;
};

export const fetchCities = async (country, config) => {
	const response = await axios.get(
		`https://countriesnow.space/api/v0.1/countries/cities/q?country=${country}`,
		config
	);
	return response.data.data;
};

export const fetchLatLon = async (city) => {
	const response = await axios.get(
		`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=d5b0bdd720ddf86eba7746791ed40c98`
	);
	const { lat, lon } = response.data[0];
	return { lat, lon };
};

export const fetchWeather = async (lat, lon) => {
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d5b0bdd720ddf86eba7746791ed40c98`
	);
	return response.data;
};
