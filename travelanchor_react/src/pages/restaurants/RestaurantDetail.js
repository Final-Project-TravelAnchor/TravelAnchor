import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { callRestaurantDetailAPI } from "../../apis/RestaurantAPICalls";

const RestaurantDetail = () => {
    const navigate = useNavigate();
    const { place_id } = useParams();
    const [places, setPlaces] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    const fetchRestaurantDetail = useCallback(async () => {
        try {
            console.log("Fetching places with params:", { place_id });
            const response = await callRestaurantDetailAPI({ place_id });
            console.log("Fetched restaurant details:", response);
            setPlaces(response || []); 
            console.log("results : ", response);
        } catch (err) {
            setError("레스토랑 정보를 가져오는데 실패했습니다.");
            console.error("Error fetching restaurant details:", err);
        } finally {
            setLoading(false);
        }
    }, [place_id]);

    useEffect(() => {
        fetchRestaurantDetail();
    }, [place_id, fetchRestaurantDetail]);

    console.log("Current place state:", places);

    const handleSave = () => {
        if (places) {
            localStorage.setItem("savedRestaurant", JSON.stringify(places));
            setIsSaved(true);  // 버튼을 "저장됨"으로 바꿈
            alert("레스토랑 정보가 저장되었습니다!");
        } else {
            alert("저장할 레스토랑 정보가 없습니다.");
        }
    };

    const handleBackToList = () => {
        navigate("/api/places");
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!places || Object.keys(places).length === 0)
        return <div>No restaurant details available.</div>;

    return (
        <div>
            <h1>{places.name}</h1>
            <p>
                <strong>주소:</strong> {places.formatted_address}  
            </p>
            <p>
                <strong>전화번호:</strong> {places.formatted_phone_number} 
            </p>
            <p>
                <strong>평점:</strong> {places.rating} ({places.user_ratings_total}명 평가) 
            </p>
            <p>
                <strong>영업 상태:</strong> {places.business_status}  
            </p>
            <p>
                <strong>식사 옵션:</strong>{" "}
                {places.dine_in ? "식사 가능" : "식사 불가"},
                {places.takeout ? "포장 가능" : "포장 불가"},
                {places.delivery ? "배달 가능" : "배달 불가"}
            </p>
            <p>
                <strong>브런치 제공:</strong>{" "}
                {places.serves_brunch ? "예" : "아니오"} 
            </p>
            <p>
                <strong>점심 제공:</strong>{" "}
                {places.serves_lunch ? "예" : "아니오"}  
            </p>
            <p>
                <strong>저녁 제공:</strong>{" "}
                {places.serves_dinner ? "예" : "아니오"}  
            </p>
            <p>
                <strong>맥주 제공:</strong>{" "}
                {places.serves_beer ? "예" : "아니오"} 
            </p>
            <p>
                <strong>와인 제공:</strong>{" "}
                {places.serves_wine ? "예" : "아니오"}  
            </p>

            {places.website && (
                <p>
                    <strong>웹사이트:</strong>
                    <a href={places.website} target="_blank" rel="noopener noreferrer">
                        {places.website}
                    </a>
                </p>
            )}

            <h2>사진</h2>
            <div>
                {places.photos && places.photos.length > 0 ? (
                    places.photos.map((photo, index) => (
                        <img
                            key={index}
                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                            alt={`Photo ${index + 1}`}
                            style={{
                                width: "500px",
                                height: "auto",
                                marginBottom: "10px",
                            }}
                        />
                    ))
                ) : (
                    <p>No photos available</p>
                )}
            </div>

            <h2>리뷰</h2>
            <ul>
                {places.reviews && places.reviews.length > 0 ? (
                    places.reviews.map((review, index) => (
                        <li key={index}>
                            <p>
                                <strong>{review.author_name}</strong> (
                                {review.relative_time_description})
                            </p>
                            <p>Rating: {review.rating}</p>
                            <p>{review.text}</p>
                            {review.profile_photo_url && (
                                <img
                                    src={review.profile_photo_url}
                                    alt={`${review.author_name}'s profile`}
                                    style={{
                                        width: "50px",
                                        borderRadius: "50%",
                                    }}
                                />
                            )}
                        </li>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </ul>

            <button onClick={handleSave}>
                {isSaved ? "저장됨" : "저장하기"}  
            </button>
            <br />
            <button onClick={handleBackToList}>목록으로 돌아가기</button>
        </div>
    );
};

export default RestaurantDetail;