import React from 'react';
import './FindRestaurant.css';

const callRestaurantListAPI = () => {

	const APIKey = "AIzaSyBdC2C4NxgvxtnU5i2NY7WiREj1o5zQ4X4";
	const proxyUrl = "https://cors-anywhere.herokuapp.com/";

	const [selectedCity, setSelectedCity] = useState('seoul');
	const [selectedSort, setSelectedSort] = useState('name');
	const [places, setPlaces] = useState([]);
	const [error, setError] = useState(null);

	const fetchPlaceData = async (placeType) => {
	const url = `${proxyUrl}https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeType}%20in%20${selectedCity}&key=${APIKey}`;

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

		const data = await response.json();

		// Sort data based on the selected sorting option
		const sortedData = data.results.sort((a, b) => {
		if (selectedSort === 'rating') {
			return (b.rating || 0) - (a.rating || 0); // Sort by rating (descending)
		} else {
			return a.name.localeCompare(b.name); // Sort by name (alphabetical)
		}
		});

		setPlaces(sortedData);
		setError(null);
	} catch (error) {
		console.error('Error fetching data:', error);
		setError('Data fetching error. Please try again.');
	}
	};

	// Function to render each place card
	const renderPlaceCards = () => {
	return places.map((place, index) => (
		<div className="card" key={index}>
		<img
			src={place.photos && place.photos[0]
			? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${APIKey}`
			: 'https://via.placeholder.com/300x200?text=No+Image'}
			alt={place.name}
		/>
		<h2>{place.name}</h2>
		<p>{place.formatted_address}</p>
		<p className="rating">Rating: {place.rating || 'N/A'}</p>
		</div>
	));
	};

	return (
		<div>
			<h1>맛집 목록</h1>
			
			<form>
			<label htmlFor="city">도시 선택: </label>
			<select
				name="city"
				id="city"
				onChange={(e) => setSelectedCity(e.target.value)}
				value={selectedCity}
			>
				<option value="seoul">서울</option>
				<option value="hongkong">홍콩</option>
				<option value="osaka">오사카</option>
				<option value="taipei">타이페이</option>
				<option value="bangkok">방콕</option>
				<option value="tokyo">도쿄</option>
				<option value="paris">파리</option>
				<option value="london">런던</option>
			</select>
			</form>

			<form>
			<label htmlFor="suggestion">정렬 기준: </label>
			<select
				name="suggestion"
				id="suggestion"
				onChange={(e) => setSelectedSort(e.target.value)}
				value={selectedSort}
			>
				<option value="name">이름순</option>
				<option value="rating">추천순</option>
			</select>
			</form>

			<div>
			<button onClick={() => fetchPlaceData('restaurant')}>음식점</button>
			<button onClick={() => fetchPlaceData('tavern')}>술집</button>
			<button onClick={() => fetchPlaceData('cafe')}>카페</button>
			</div>

			{error && <p className="error">{error}</p>}
			
			<div className="card-container">
			{renderPlaceCards()}
			</div>
		</div>
	);
};

export default callRestaurantListAPI;
