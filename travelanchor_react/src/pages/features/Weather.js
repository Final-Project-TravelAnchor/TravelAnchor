import React, { useState, useRef } from 'react';
import { callOpenWeather } from '../../apis/WeatherAPICalls';
import './Weather.css';

export default function Weather() {
	const [city, setCity] = useState('');
	const [forecast, setForecast] = useState(null);
	const [error, setError] = useState('');

	// API 호출 함수
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

	// 날짜별 그룹화
	const groupByDate = (data) => {
		const groupedData = {};
	
		data.forEach((item) => {
			const date = new Date(item.dt * 1000).toLocaleDateString(); // 날짜 추출 (YYYY-MM-DD 형식)
			if (!groupedData[date]) {
				groupedData[date] = []; // 해당 날짜가 없으면 새로운 배열 생성
			}
			groupedData[date].push(item); // 날짜에 해당하는 데이터 추가
		});
	
		return groupedData; // 날짜별로 그룹화된 데이터 반환
	};

	// forecast 데이터가 있을 경우 날짜별로 그룹화
	const groupedForecast = forecast ? groupByDate(forecast.list) : {};

	return (
		<div className="weather-container">
			<h1>날씨 예보</h1>

			{/* 도시 입력 */}
			<input
				type="text"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				placeholder="도시를 영문으로 입력하세요 (예: seoul)"
			/>
			<button onClick={fetchForecast}>날씨 조회</button>

			{/* 오류 메시지 */}
			{error && <p className="error">{error}</p>}

			{forecast && (
				<div className="weather-card-container">
					<h2>{forecast.city.name}의 날씨 예보</h2>
					<div className="weather-card-grid">
						{/* 날짜별 카드 */}
						{Object.keys(groupedForecast).map((date, index) => (
							<div key={index} className="weather-card-column">
								<h3>{date}</h3>
								{groupedForecast[date].map((item, idx) => (
									<div key={idx} className="weather-card">
										<p>
											<strong>
												{new Intl.DateTimeFormat('ko-KR', { 
												hour: 'numeric', 
												hour12: true 
												}).format(new Date(item.dt * 1000))} 
											</strong>
										</p>
										{/* 날씨 아이콘 */}
										<img 
											src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} 
											alt={item.weather[0].description} 
											className="weather-icon"
										/>
										<p>{item.main.temp}°C</p>
										<p>{item.weather[0].description}</p>
										<p>{item.wind.speed} m/s</p>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}