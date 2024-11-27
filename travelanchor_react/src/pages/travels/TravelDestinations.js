import style from "../../../src/pages/travels/TravelDestination.module.css";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { callGetTravelDestinationAPI } from "../../apis/TravelDestinationAPICalls";

function TravelDestinations() {
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); // 슬라이드 인덱스
    const visibleCards = 1; // 화면에 보이는 카드 수
    const cardWidth = 300 + 25; // 카드 너비(300px) + gap(20px)

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

    const handleNext = () => {
        const maxIndex = Math.ceil(cities.length / visibleCards) - 1;
        if (currentIndex < maxIndex) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    return (
        <div style={{ position: "relative", overflow: "hidden", maxWidth: "1000px", margin: "0 auto" }}>
            <button className={`${style.arrowButton} ${style.arrowButtonLeft}`} onClick={handlePrev}>
                ←
            </button>
            <div
                className={style.DestinaitonCardContainer}
                style={{
                    transform: `translateX(-${currentIndex * cardWidth * visibleCards}px)`,
                }}
            >
                {cities.map((place, index) => (
                    <div
                        key={index}
                        className={style.DestnationCard}
                        onClick={() =>
                            navigate(`/TravelDestinations/${place.place_id}`, {
                                state: { place: place },
                            })
                        }
                    >
                        <div>
                            {place.photos && place.photos.length > 0 ? (
                                place.photos.map((photo, photoIndex) => (
                                    <img
                                        key={photoIndex}
                                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                                        alt={`Photo ${photoIndex + 1}`}
                                    />
                                ))
                            ) : (
                                <p>No photos available</p>
                            )}
                        </div>
                        <h2>{place.name}</h2>
                        <p>{place.formatted_address}</p>
                    </div>
                ))}
            </div>
            <button className={`${style.arrowButton} ${style.arrowButtonRight}`} onClick={handleNext}>
                →
            </button>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default TravelDestinations;