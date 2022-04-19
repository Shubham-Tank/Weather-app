const urls = {
	countries: "https://countriesnow.space/api/v0.1/countries/iso",
	cities: (country) =>
		`https://countriesnow.space/api/v0.1/countries/cities/q?country=${country}`,
	latLon: (city) =>
		`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=d5b0bdd720ddf86eba7746791ed40c98`,
	weather: (lat, lon) =>
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d5b0bdd720ddf86eba7746791ed40c98`,
};
export default urls;
