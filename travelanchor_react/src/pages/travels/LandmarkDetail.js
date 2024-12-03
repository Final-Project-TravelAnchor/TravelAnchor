import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { callLandmarkDetailAPI } from "../../apis/TravelDestinationAPICalls";
import styles from "./LandmarkDetail.module.css";

const LandmarkDetail = () => {
	const navigate = useNavigate();
	const { landmark_id } = useParams();
	const [landmark, setLandmark] = useState(null);
	const [error, setError] = useState(null);
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

	useEffect(() => {
		const fetchLandmarkDetails = async () => {
			try {
				const response = await callLandmarkDetailAPI({ landmark_id });
				setLandmark(response); 
			} catch (err) {
				setError("랜드마크 정보를 가져오는데 실패했습니다.");
			}
		};

		fetchLandmarkDetails();
	}, [landmark_id]);

	const handleBackToList = () => {
		navigate(`/TravelDestinations`);
	};

	const handleNextPhoto = () => {
		if (landmark.photos) {
			setCurrentPhotoIndex((prevIndex) =>
				prevIndex === landmark.photos.length - 1 ? 0 : prevIndex + 1
			);
		}
	};

	const handlePrevPhoto = () => {
		if (landmark.photos) {
			setCurrentPhotoIndex((prevIndex) =>
				prevIndex === 0 ? landmark.photos.length - 1 : prevIndex - 1
			);
		}
	};

	if (error) return <div>Error: {error}</div>;
	if (!landmark) return <div>Loading landmark details...</div>;

	return (
		<div className={styles.landmarkContainer}>
			<h1>{landmark.name}</h1>
			<p>{landmark.formatted_address}</p>
			{landmark.rating && (
				<p className={styles.rating}>
					<strong>평점:</strong> {landmark.rating} (
					{landmark.user_ratings_total || 0}명 평가)
				</p>
			)}
			<div 
				className={styles.landmarkPhoto}
				style={{ position: "relative", textAlign: "center" }}
			>
				{landmark.photos && landmark.photos.length > 0 ? (
					<>
						<button
							className={styles.landmarkPrevButton}
							onClick={handlePrevPhoto}
						>
							&#8249;
						</button>
						<img
							src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${landmark.photos[currentPhotoIndex].photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
							alt={`Photo ${currentPhotoIndex + 1}`}
							className={styles.photo}
						/>
						<button
							className={styles.landmarkNextButton}
							onClick={handleNextPhoto}
						>
							&#8250;
						</button>
					</>
				) : (
					<p>No photos available</p>
				)}
			</div>
			{landmark.website && (
				<p>
					<strong>웹사이트:</strong>{" "}
					<a
						href={landmark.website}
						target="_blank"
						rel="noopener noreferrer"
					>
						{landmark.website}
					</a>
				</p>
			)}
			<h2>리뷰</h2>
			<ul className={styles.landmarkReviewList}>
				{landmark.reviews && landmark.reviews.length > 0 ? (
					landmark.reviews.map((review, index) => (
						<li key={index} className={styles.landmarkReviewItem}>
							<p>
								<strong>{review.author_name}</strong> (
								{review.relative_time_description})
							</p>
							<p>평점: {review.rating}</p>
							<p>{review.text}</p>
							{review.profile_photo_url && (
								<img
									src={review.profile_photo_url}
									alt={`${review.author_name}'s profile`}
									className={styles.profilePhoto}
									style={{
										width: "50px",
                                        borderRadius: "50%",
									}}
								/>
							)}
						</li>
					))
				) : (
					<p>리뷰가 없습니다.</p>
				)}
			</ul>
			<button className={styles.landmarkBackButton} onClick={handleBackToList}>
				목록으로 돌아가기
			</button>
		</div>
	);
};

export default LandmarkDetail;
