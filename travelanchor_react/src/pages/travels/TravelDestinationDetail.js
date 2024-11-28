import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { callTravelDestinationDetailAPI } from "../../apis/TravelDestinationAPICalls";
import { saveTravelDestinationAPI } from "../../apis/FavoriteTravelDestinationCalls";
import { callGetMemberAPI } from "../../apis/MemberAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import { POST_TRAVEL_DESTINATION } from "../../modules/FavoriteTravelDestinationModule";
import styles from "../../../src/pages/travels/TravelDestinationDetail.module.css";

const TravelDestinationDetail = () => {
	const navigate = useNavigate();
	const { place_id } = useParams();
	const dispatch = useDispatch();

	const [travelDestinationDetails, setDestinationDetails] = useState({});
	const [landmarks, setLandmarks] = useState([]);
	const [error, setError] = useState(null);
	const [isSaved, setIsSaved] = useState(false);
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
	const [memberCode, setMemberCode] = useState(null);
	const [memberName, setMemberName] = useState(null); 
	const [form, setForm] = useState({
		favoriteCode: null,
		apiLink: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&language=ko&key=${process.env.REACT_APP_GOOGLE_KEY}`,
		destinationName: "",
		destinationPhotos: "",
		memberName: "", 
	});

	useEffect(() => {
		const tokenSub = decodeJwt(window.localStorage.getItem("accessToken"));

		// Fetch member details
		const fetchMemberDetails = async () => {
			try {
				const response = await dispatch(
					callGetMemberAPI({ memberName: tokenSub.sub })
				);
				if (response && response.member) {
					setMemberName(response.member.memberName);
					setForm((prevForm) => ({
						...prevForm,
						memberName: response.member.memberName,
					}));
				}
			} catch (err) {
				console.error("Error fetching member details:", err);
			}
		};

		fetchMemberDetails();
	}, [dispatch]);

	const fetchTravelDestinationDetails = useCallback(async () => {
		try {
			const response = await callTravelDestinationDetailAPI({ place_id });
			setDestinationDetails(response.destinationDetails || {});
			setLandmarks(response.culturalLandmark || []);
			setForm((prevForm) => ({
				...prevForm,
				destinationName: response.destinationDetails?.name || "",
				destinationPhotos: response.destinationDetails?.photos?.[0]
					? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${response.destinationDetails.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`
					: "https://example.com/default-placeholder-image.jpg",
			}));
		} catch (err) {
			setError("여행지 정보를 가져오는데 실패했습니다.");
		}
	}, [place_id]);

	useEffect(() => {
		fetchTravelDestinationDetails();
	}, [place_id, fetchTravelDestinationDetails]);

	const onClickSaveTravelDestinationHandler = async () => {
		if (!memberName) {
			alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
			return;
		}

		try {
			const destinationToSave = { ...form, memberName };
			const response = await dispatch(
				saveTravelDestinationAPI(destinationToSave)
			);

			if (response.type === POST_TRAVEL_DESTINATION) {
				setIsSaved(true); 
				alert("여행지가 성공적으로 저장되었습니다!");
				navigate(`/SavedTravelDestination/${memberCode}`);
			} else {
				console.warn("저장에 실패했습니다. 다시 시도해주세요.");
				alert("저장에 실패했습니다.");
			}
		} catch (err) {
			console.error("Error while saving destination:", err);
			alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
		}
	};

	const handleBackToList = () => {
		navigate("/TravelDestinations");
	};

	const goToPreviousPhoto = () => {
		setCurrentPhotoIndex((prevIndex) =>
			prevIndex === 0
				? travelDestinationDetails.photos.length - 1
				: prevIndex - 1
		);
	};

	const goToNextPhoto = () => {
		setCurrentPhotoIndex((prevIndex) =>
			prevIndex === travelDestinationDetails.photos.length - 1
				? 0
				: prevIndex + 1
		);
	};

	if (error) return <div>Error: {error}</div>;
	if (!travelDestinationDetails.name)
		return <div>Loading travel destination details...</div>;

	return (
		<div className={styles.travelDestinationContainer}>
			<h1>{form.destinationName}</h1>
			{travelDestinationDetails.website && (
				<p>
					<a
						href={travelDestinationDetails.website}
						target="_blank"
						rel="noopener noreferrer"
					>
						{travelDestinationDetails.website}
					</a>
				</p>
			)}
			<h2>사진</h2>
			<div className={styles.carouselContainer}>
				{travelDestinationDetails.photos &&
				travelDestinationDetails.photos.length > 0 ? (
					<>
						<div
							className={styles.carouselImages}
							style={{
								transform: `translateX(-${
									currentPhotoIndex * 100
								}%)`,
								width: "100%", // 크기 맞춤
							}}
						>
							{travelDestinationDetails.photos.map(
								(photo, index) => (
									<img
										key={index}
										src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
										alt={`Photo ${index + 1}`}
									/>
								)
							)}
						</div>
						<button
							className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
							onClick={goToPreviousPhoto}
							disabled={
								travelDestinationDetails.photos.length === 0
							}
						>
							&#8592;
						</button>
						<button
							className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
							onClick={goToNextPhoto}
							disabled={
								travelDestinationDetails.photos.length === 0
							}
						>
							&#8594;
						</button>
					</>
				) : (
					<p>No photos available</p>
				)}
			</div>
			<h2>근처 랜드마크</h2>
			<div className={styles.landmarksContainer}>
				{landmarks.length > 0 ? (
					landmarks.map((landmark, index) => {
						const handleLandmarkClick = () => {
							navigate(`/Landmarks/${landmark.place_id}`);
						};

						return (
							<div
								key={index}
								className={styles.landmarkCard}
								onClick={handleLandmarkClick}
								style={{ cursor: "pointer" }}
							>
								{landmark.photos &&
									landmark.photos.length > 0 && (
										<img
											src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${landmark.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
											alt={`Landmark ${index + 1}`}
										/>
									)}
								<div>
									<h3>{landmark.name}</h3>
								</div>
							</div>
						);
					})
				) : (
					<p>근처에 표시할 랜드마크가 없습니다.</p>
				)}
			</div>

			{/* <button onClick={onClickSaveTravelDestinationHandler}>
				{isSaved ? "저장됨" : "저장하기"}
			</button> */}
			<br />
			<button onClick={handleBackToList}>목록으로 돌아가기</button>
		</div>
	);
};

export default TravelDestinationDetail;
