const urls = {
    countries: 'https://countriesnow.space/api/v0.1/countries/iso',
    cities: 'https://countriesnow.space/api/v0.1/countries/cities',
    latLon: (city) => `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=d5b0bdd720ddf86eba7746791ed40c98`,
    weather: (lat, lon) => ``
}
export default urls