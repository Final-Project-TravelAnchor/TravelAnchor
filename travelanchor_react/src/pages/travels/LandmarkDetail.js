import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { callLandmarkDetailAPI } from "../../apis/TravelDestinationAPICalls";
import styles from "./LandmarkDetail.module.css"; // Import CSS module

const LandmarkDetail = () => {
	const navigate = useNavigate();
	const { landmark_id } = useParams(); // Get landmark_id from URL
	const [landmark, setLandmark] = useState(null); // Single landmark object
	const [error, setError] = useState(null);
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // Current photo index

	useEffect(() => {
		const fetchLandmarkDetails = async () => {
			try {
				const response = await callLandmarkDetailAPI({ landmark_id });
				setLandmark(response); // Set the landmark details
			} catch (err) {
				setError("랜드마크 정보를 가져오는데 실패했습니다.");
			}
		};

		fetchLandmarkDetails();
	}, [landmark_id]);

	const handleBackToList = () => {
		navigate(`/TravelDestinations/${landmark.place_id}`);
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
		<div className={styles.container}>
			<h1 className={styles.title}>{landmark.name}</h1>
			<p className={styles.address}>{landmark.formatted_address}</p>
			{landmark.rating && (
				<p className={styles.rating}>
					<strong>평점:</strong> {landmark.rating} (
					{landmark.user_ratings_total || 0}명 평가)
				</p>
			)}
			<div className={styles.photoCarousel}>
				{landmark.photos && landmark.photos.length > 0 ? (
					<>
						<button
							className={styles.prevButton}
							onClick={handlePrevPhoto}
							aria-label="Previous Photo"
						>
							❮
						</button>
						<img
							src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${landmark.photos[currentPhotoIndex].photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
							alt={`Photo ${currentPhotoIndex + 1}`}
							className={styles.photo}
						/>
						<button
							className={styles.nextButton}
							onClick={handleNextPhoto}
							aria-label="Next Photo"
						>
							❯
						</button>
					</>
				) : (
					<p>No photos available</p>
				)}
			</div>
			{landmark.website && (
				<p className={styles.website}>
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
			<h2 className={styles.reviewTitle}>리뷰</h2>
			<ul className={styles.reviewList}>
				{landmark.reviews && landmark.reviews.length > 0 ? (
					landmark.reviews.map((review, index) => (
						<li key={index} className={styles.reviewItem}>
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
								/>
							)}
						</li>
					))
				) : (
					<p>리뷰가 없습니다.</p>
				)}
			</ul>
			<button className={styles.backButton} onClick={handleBackToList}>
				목록으로 돌아가기
			</button>
		</div>
	);
};

export default LandmarkDetail;
