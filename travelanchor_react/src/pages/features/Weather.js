import React, { useState } from 'react';

function Weather() {
	const [city, setCity] = useState('');
	const [forecast, setForecast] = useState(null);
	const [error, setError] = useState('');

	const fetchForecast = () => {
		if (!city) return;

		fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
		.then(response => response.json())
		.then(data => {
			if (data.cod === "200") {
			setForecast(data);
			setError('');
			} else {
			setError("도시를 찾을 수 없습니다.");
			setForecast(null);
			}
		})
		.catch(error => {
			setError("날씨 정보를 가져오는 중 오류가 발생했습니다.");
			setForecast(null);
			console.error("Error:", error);
		});
	};

	return (
		<div className="container">
		<h1>5-Day Weather Forecast</h1>
		
		<input
			type="text"
			value={city}
			onChange={(e) => setCity(e.target.value)}
			placeholder="도시명을 입력하세요"
		/>
		<button onClick={fetchForecast}>날씨 조회</button>

		{error && <p>{error}</p>}

		{forecast && (
			<div id="forecast">
			<h2>{forecast.city.name}의 날씨 예보</h2>
			{forecast.list.slice(0, 40).map((item, index) => {
				const date = new Date(item.dt * 1000);
				return (
				<div key={index}>
					<h3>{date.toLocaleString()}</h3>
					<p>온도: {item.main.temp}°C</p>
					<p>날씨: {item.weather[0].description}</p>
					<p>풍속: {item.wind.speed} m/s</p>
					<hr />
				</div>
				);
			})}
			</div>
		)}
		</div>
	);
}

export default Weather;