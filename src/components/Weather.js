import React, { useState, useEffect } from 'react';
import warm from '../assets/warm-bg.jpg';
import cool from '../assets/cold-bg.jpg';
import classes from './Weather.module.css';
import Card from 'react-bootstrap/Card';
const DUMMY_CITIES = ['London', 'New York', 'Mumbai'];
const Weather = () => {
	//const [data, setData] = useState(null);
	const [responseData, setResponseData] = useState([]);
	const searchWeather = async (e) => {
		const loadedData = [];
		for (let i = 0; i < DUMMY_CITIES.length; i++) {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${DUMMY_CITIES[i]}&APPID=a053795b6d2421d0d8e760779e912b1f`
			);

			const data = await response.json();
			console.log(data);
			loadedData.push(data);
		}
		setResponseData(loadedData);
	};
	const dateBuilder = (d) => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		let days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};
	useEffect(() => {
		searchWeather();
	}, []);
	const capitalize = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
	return (
		<div className={classes.weather}>
			{console.log(responseData.length)}
			{responseData !== null &&
				responseData.map((data) => (
					<Card key={data.sys.id} className={classes.card}>
						<Card.Img
							className={classes.img}
							variant="top"
							src={Math.round(data.main.temp - 273.15) > 20 ? warm : cool}
						/>

						<div className={classes['location-box']}>
							<div className={classes.date}>
								{data.name},{data.sys.country}
							</div>
							<div className={classes.date}>{dateBuilder(new Date())}</div>
							<div className={classes.temp}>
								{Math.round(data.main.temp - 273.15)}°C
							</div>
						</div>
						<Card.Body>
							<Card.Title>{capitalize(data.weather[0].description)}</Card.Title>
							<Card.Text className={classes.max}>
								Max:
								{(data.main.temp_max - 273.15).toFixed(2)}°C
							</Card.Text>
							<hr />
							<Card.Text>
								Min:
								{(data.main.temp_min - 273.15).toFixed(2)}°C
							</Card.Text>
						</Card.Body>
					</Card>
				))}
		</div>
	);
};

export default Weather;
