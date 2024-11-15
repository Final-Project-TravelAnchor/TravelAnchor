export const callOpenWeather = async (city) => {
	const url = 'https://api.openweathermap.org/data/2.5/forecast';
	const params = new URLSearchParams({
		q: city,
		appid: process.env.REACT_APP_WEATHER_API_KEY,
		units: 'metric',
	});

	try {
		const response = await fetch(`${url}?${params.toString()}`);
		const data = await response.json();

		if (data.cod === "200") {
			return data; // 데이터를 반환
		} else {
			throw new Error("도시를 찾을 수 없습니다.");
		}
	} catch (error) {
		throw new Error("API 호출에 실패했습니다.");
	}
};
