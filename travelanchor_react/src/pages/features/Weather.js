import React, { useState, useRef } from 'react';
import { callOpenWeather } from '../../apis/WeatherAPICalls';

export default function Weather() {
	const [city, setCity] = useState('');
	const [forecast, setForecast] = useState(null);
	const [error, setError] = useState('');

	const fetchForecast = async () => {
		try {
			const forecastResponse = await callOpenWeather(city); // city를 인자로 전달
			console.log("날씨예보 : ", forecastResponse);
			setForecast(forecastResponse); // 상태 업데이트
			setError(''); // 오류 초기화
		} catch (err) {
			setError(err.message); // 오류 메시지 설정
			setForecast(null); // 예보 초기화
		}
	};

	return (
		<div className="container">
			<h1>5일간의 Weather Forecast</h1>
			<input
				type="text"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				placeholder="도시명을 영문으로 입력하세요 예:seoul"
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
