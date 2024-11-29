import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { callTravelDestinationDetailAPI } from "../../apis/TravelDestinationAPICalls";
import { saveTravelDestinationAPI } from "../../apis/FavoriteTravelDestinationCalls";
import { callGetMemberAPI } from "../../apis/MemberAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
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
    const isLogin = window.localStorage.getItem('accessToken');
    const member = useSelector(state => state.memberReducer.member);

    const [form, setForm] = useState({
        favoriteCode: null,
        apiLink: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&language=ko&key=${process.env.REACT_APP_GOOGLE_KEY}`,
        destinationName: "",
        destinationPhotos: "",
        memberCode: "",
    });

    // useEffect(() => {
    //     const token = window.localStorage.getItem('accessToken');
    //     if (token) {
    //         const decodedToken = decodeJwt(token);
    //         if (decodedToken.exp * 1000 > Date.now()) {
    //             dispatch(callGetMemberAPI({ memberCode: decodedToken.sub }));
    //         } else {
    //             window.localStorage.removeItem('accessToken');
    //         }
    //     }
    // }, [dispatch, isLogin]);

    const memberCode     = member ? member.memberCode : null;
    console.log("memberCode :" + memberCode);

    const fetchTravelDestinationDetails = useCallback(async () => {
        try {
            const response = await callTravelDestinationDetailAPI({ place_id });
            setDestinationDetails(response.destinationDetails || {});
            setLandmarks(response.culturalLandmark || []);
            setForm((prevForm) => ({
                ...prevForm,
				memberCode: member.memberCode,
                destinationName: response.destinationDetails?.name || "",
                destinationPhotos: response.destinationDetails?.photos?.[0]
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${response.destinationDetails.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`
                    : "https://example.com/default-placeholder-image.jpg",
            }));
        } catch (err) {
            setError("여행지 정보를 가져오는데 실패했습니다.");
        }
    }, [place_id, member]);

    useEffect(() => {
        fetchTravelDestinationDetails();
    }, [place_id, fetchTravelDestinationDetails]);

    const imagesContainer = document.querySelector('.DestinatiDetailImages');
    const images = document.querySelectorAll('.DestinatiDetailImages img');
    let currentIndex = 0;
    function updateCarousel() {
        const imageWidth = images[0].clientWidth; // 이미지의 너비 계산
        imagesContainer.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
      }
    

	const onClickSaveTravelDestinationHandler = async () => {
		try {
			const response = await saveTravelDestinationAPI(form);
			if (response) {
				setIsSaved(true);
				alert("여행지가 성공적으로 저장되었습니다!");
				console.log("result : ", form);
			} else {
				alert("저장에 실패했습니다.");
			}
		} catch (error) {
			console.error("Error saving destination:", error);
			alert("저장 중 오류가 발생했습니다.");
		}
	};

    const handleBackToList = () => {
        navigate("/TravelDestinations");
    };

    const goToPreviousPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === 0 ? travelDestinationDetails.photos.length - 1 : prevIndex - 1
        );
    };

    const goToNextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === travelDestinationDetails.photos.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (error) return <div>Error: {error}</div>;
    if (!travelDestinationDetails.name) return <div>Loading travel destination details...</div>;

    return (
        <div className={styles.travelDestinationDetailContainer}>
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
            <div className={styles.DestinatiDetailImaesContainer}>
                {travelDestinationDetails.photos &&
                travelDestinationDetails.photos.length > 0 ? (
                    <>
                        <div
                            className={styles.DestinatiDetailImages}
                            style={{
                                transform: `translateX(-${currentPhotoIndex * 100}%)`,
                                width: "100%", // 크기 맞춤
                            }}
                        >
                            {travelDestinationDetails.photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                                    alt={`Photo ${currentPhotoIndex + 1}`}
                                />
                            ))}
                        </div>
                        <div>
                            <button
                                className={styles.DestiantionPrevButton}
                                onClick={goToPreviousPhoto}
                            >
                                &#8249;
                            </button>
                            <button
                                className={styles.DestinationNextButton}
                                onClick={goToNextPhoto}
                            >
                                &#8250;
                            </button>
                        </div>
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