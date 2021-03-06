import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BsThermometerHalf, BsWind, BsSpeedometer } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchWeather } from "../api";

const Weather = ({ lat, lon, country, loadingWeather, setLoadingWeather }) => {
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		(async () => {
			if (loadingWeather) {
				const weatherResponse = await fetchWeather(lat, lon);
				if (JSON.stringify(weatherData) !== JSON.stringify(weatherResponse))
					setWeatherData(weatherResponse);
				setLoadingWeather(false);
			}
		})();
	});

	const date = new Date();
	const minutes = date.getMinutes();
	const hours = date.getHours();

	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	return !loadingWeather ? (
		<Box sx={{ flexGrow: 1 }} className="weather-container">
			<Grid container spacing={2}>
				<Grid item xs={6} className="weather-info">
					<div className="temp">
						<BsThermometerHalf style={{ verticalAlign: "text-bottom" }} />
						{Math.round(weatherData.main.temp - 273.15)} <sup>°C</sup>
					</div>
					<div className="lite weather-subinfo">
						<h4>
							<Tooltip
								title={`Humidity: ${weatherData.main.humidity}%`}
								placement="right"
								arrow
							>
								<span className="lite">
									<WiHumidity
										style={{
											verticalAlign: "sub",
											fontSize: "1.5rem",
										}}
									/>
									{weatherData.main.humidity}%
								</span>
							</Tooltip>
						</h4>

						<h4>
							<Tooltip
								title={`Wind: ${Math.floor(weatherData.wind.speed * 3.6)} Km/h`}
								placement="right"
								arrow
							>
								<span className="lite">
									<BsWind
										style={{
											verticalAlign: "text-bottom",
											marginRight: ".2rem",
										}}
									/>
									{Math.floor(weatherData.wind.speed * 3.6)} Km/h
								</span>
							</Tooltip>
						</h4>

						<h4>
							<Tooltip
								title={`Atmospheric Pressure: ${weatherData.main.pressure} hPa`}
								placement="right"
								arrow
							>
								<span className="lite">
									<BsSpeedometer
										style={{
											verticalAlign: "text-bottom",
											marginRight: ".2rem",
										}}
									/>
									{weatherData.main.pressure} hPa
								</span>
							</Tooltip>
						</h4>
					</div>
				</Grid>
				<Grid item xs={6} style={{ textAlign: "right" }}>
					<h2 className="pro">
						{weatherData.name}, {country}
					</h2>
					<h4 className="lite">{lat.toFixed(4)}° N</h4>
					<h4 className="lite">{lon.toFixed(4)}° E</h4>
				</Grid>
				<Grid
					item
					xs={12}
					style={{
						textAlign: "center",
						display: "flex",
						justifyContent: "space-around",
						alighItems: "center",
						flexWrap: "wrap",
						marginTop: "1rem",
					}}
				>
					<div className="weather">
						<img
							src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
						/>
						<h1 className="pro">{weatherData.weather[0].description}</h1>
					</div>
					<div className="date-time">
						<h1>
							<span>{days[date.getDay()]} </span>
							<span className="time">
								{`${hours % 12}:${minutes < 10 ? `0${minutes}` : minutes} ${
									hours > 12 ? "pm" : "am"
								}`}
							</span>
						</h1>
						<h2 className="lite">{date.toDateString().slice(4)}</h2>
					</div>
				</Grid>
			</Grid>
		</Box>
	) : (
		<div className="loader-container">
			<CircularProgress className="loader-weather" size="4rem" />
		</div>
	);
};

export default Weather;
