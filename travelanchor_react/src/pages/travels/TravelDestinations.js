import style from "../../../src/pages/travels/TravelDestination.module.css";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { callGetTravelDestinationAPI } from "../../apis/TravelDestinationAPICalls";

function TravelDestinations() {
	const navigate = useNavigate();
	const [cities, setCities] = useState([]);
	const [error, setError] = useState(null);

	const fetchTravelDestinationData = useCallback(async () => {
		try {
			const cityNames = [
				"seoul korea",
				"hongkong",
				"tokyo japan",
				"taipei taiwan",
				"osaka japan",
				"bangkok thailand",
				"hanoi vietnam",
				"phuket thailand",
				"dubai arab emirates",
				"bali indonesia",
				"london uk",
				"roma italy",
				"paris france",
				"newyork city",
				"barcelona spain",
			];

			const response = await callGetTravelDestinationAPI({
				cities: cityNames,
			});
			setCities(response || []);
			console.log("API Response:", response);
		} catch (error) {
			console.error("Error fetching travel destinations:", error);
			setError("Failed to fetch travel destinations. Please try again.");
		}
	}, []);

	useEffect(() => {
		fetchTravelDestinationData();
	}, [fetchTravelDestinationData]);

	return (
		<div className={style.cardContainer}>
			{cities.map((place, index) => (
				<div
					key={index}
					className={style.card}
					onClick={() =>
						navigate(`/TravelDestinations/${place.place_id}`, {
							state: { place: place },
						})
					}
					style={{ cursor: "pointer" }}
				>
					<div>
						{place.photos && place.photos.length > 0 ? (
							place.photos.map((photo, photoIndex) => (
								<img
									key={photoIndex}
									className={style.cardImg}
									src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
									alt={`Photo ${photoIndex + 1}`}
								/>
							))
						) : (
							<p>No photos available</p>
						)}
					</div>
					<h2 className={style.cardH2}>{place.name}</h2>
					<p className={style.cardP}>{place.formatted_address}</p>
				</div>
			))}
			{error && <p className="error">{error}</p>}
		</div>
	);
}

export default TravelDestinations;
