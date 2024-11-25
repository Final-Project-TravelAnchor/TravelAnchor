import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { callTravelDestinationDetailAPI } from "../../apis/TravelDestinationAPICalls";
import { saveTravelDestinationAPI } from "../../apis/FavoriteTravelDestinationCalls";
import styles from "../../../src/pages/travels/TravelDestinationDetail.module.css";

const TravelDestinationDetail = () => {
	const navigate = useNavigate();
	const { place_id } = useParams();
	const [destinationDetails, setDestinationDetails] = useState({});
	const [landmarks, setLandmarks] = useState([]);
	const [error, setError] = useState(null);
	// const [isSaved, setIsSaved] = useState(false);
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

	const fetchTravelDestinationDetail = useCallback(async () => {
		try {
			const response = await callTravelDestinationDetailAPI({ place_id });
			setDestinationDetails(response.destinationDetails || {});
			setLandmarks(response.culturalLandmark || []);
		} catch (err) {
			setError("여행지 정보를 가져오는데 실패했습니다.");
		}
	}, [place_id]);

	useEffect(() => {
		fetchTravelDestinationDetail();
	}, [place_id, fetchTravelDestinationDetail]);

	// const fetchMemberCode = async () => {
	// 	const response = await fetch(
	// 		`http://${process.env.REACT_APP_RESTAPI_IP}:8080/member/v1/members/${member_code}`,
	// 		{
	// 			method: "GET",
	// 			headers: {
	// 				Accept: "application/json",
	// 				"Content-Type": "application/json",
	// 			},
	// 		}
	// 	);

	// 	if (!response.ok) {
	// 		throw new Error("Failed to fetch member code");
	// 	}

	// 	const data = await response.json();
	// 	return data.member_code;
	// };

	// const handleSave = async () => {
	// 	if (destinationDetails) {
	// 		try {
	// 			const memberCode = await fetchMemberCode();

	// 			const payload = {
	// 				favorite_code: `fav_${Date.now()}`,
	// 				member_code: memberCode,
	// 				api_link: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&language=ko&key=${process.env.REACT_APP_GOOGLE_KEY}`,
	// 				destination_name: destinationDetails.name,
	// 				destination_photo:
	// 					destinationDetails.photos &&
	// 					destinationDetails.photos.length > 0
	// 						? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${destinationDetails.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`
	// 						: "",
	// 			};

	// 			console.log("Payload being sent to API:", payload);

	// 			const response = await saveTravelDestinationAPI(payload);

	// 			if (response && response.status === 200) {
	// 				setIsSaved(true);
	// 				alert("여행지가 저장되었습니다!");
	// 			} else {
	// 				throw new Error(response.message || "저장에 실패했습니다.");
	// 			}
	// 		} catch (err) {
	// 			console.error("Error saving travel destination:", err);
	// 			alert("저장 중 오류가 발생했습니다.");
	// 		}
	// 	} else {
	// 		alert("저장할 여행지 정보가 없습니다.");
	// 	}
	// };

	const handleBackToList = () => {
		navigate("/TravelDestinations");
	};

	const goToPreviousPhoto = () => {
		setCurrentPhotoIndex((prevIndex) =>
			prevIndex === 0
				? destinationDetails.photos.length - 1
				: prevIndex - 1
		);
	};

	const goToNextPhoto = () => {
		setCurrentPhotoIndex((prevIndex) =>
			prevIndex === destinationDetails.photos.length - 1
				? 0
				: prevIndex + 1
		);
	};

	if (error) return <div>Error: {error}</div>;
	if (!destinationDetails.name)
		return <div>Loading travel destination details...</div>;

	return (
		<div className={styles.container}>
			<h1>{destinationDetails.name}</h1>
			{destinationDetails.website && (
				<p>
					<strong>웹사이트:</strong>
					<a
						href={destinationDetails.website}
						target="_blank"
						rel="noopener noreferrer"
					>
						{destinationDetails.website}
					</a>
				</p>
			)}

			<h2>사진</h2>
			<div className={styles.carouselContainer}>
				{destinationDetails.photos &&
				destinationDetails.photos.length > 0 ? (
					<div
						className={styles.carouselImages}
						style={{
							transform: `translateX(-${
								currentPhotoIndex * 100
							}%)`,
						}}
					>
						{destinationDetails.photos.map((photo, index) => (
							<img
								key={index}
								src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
								alt={`Photo ${index + 1}`}
							/>
						))}
					</div>
				) : (
					<p>No photos available</p>
				)}
				<button
					className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
					onClick={goToPreviousPhoto}
				>
					&#8592;
				</button>
				<button
					className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
					onClick={goToNextPhoto}
				>
					&#8594;
				</button>
			</div>

			<h2>Nearby Landmarks</h2>
			<div className={styles.landmarksContainer}>
				{landmarks.length > 0 ? (
					landmarks.map((landmark, index) => (
						<div key={index}>
							<h3>{landmark.name}</h3>
							<p>{landmark.formatted_address}</p>
							{landmark.photos && landmark.photos.length > 0 && (
								<img
									src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${landmark.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
									alt={`Landmark ${index + 1}`}
								/>
							)}
						</div>
					))
				) : (
					<p>No landmarks found near this location.</p>
				)}
			</div>

			{/*<button onClick={handleSave}>
				{isSaved ? "저장됨" : "저장하기"}
			</button>*/}
			<br/>
			<button onClick={handleBackToList}>목록으로 돌아가기</button>
		</div>
	);
};

export default TravelDestinationDetail;
