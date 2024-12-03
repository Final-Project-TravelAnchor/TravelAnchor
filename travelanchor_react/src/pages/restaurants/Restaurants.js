import style from '../../../src/pages/restaurants/Restaurants.module.css';
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { callGetRestaurantAPI } from '../../apis/RestaurantAPICalls';
import commonCss from '../../components/common/common.module.css';

function Restaurants() {

    const navigate = useNavigate();

    const [city, setCity] = useState("seoul");
    const [sort, setSort] = useState("name");
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);

    const fetchPlaceData = useCallback(
        async (type) => {
            try {
                console.log("Fetching places with params:", { type, city });
                const response = await callGetRestaurantAPI({ type, city });
                console.log("API Response:", response);
                setPlaces(response || []);
                console.log("results : ", response);
                setError(null);
            } catch (err) {
                console.error("Error fetching places:", err);
                setError("Failed to fetch places. Please try again.");
            }
        },
        [city] // 'city'를 의존성으로 추가
    );
    
    const onClickHandler = (type) => {
        fetchPlaceData(type);
    };

    const sortedPlaces = [...places].sort((a, b) => {
        if (sort === "rating") {
            return (b.rating || 0) - (a.rating || 0);
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    const renderPlaceCards = () => {
        console.log("Rendering Places:", sortedPlaces); // 렌더링할 장소 확인
        return sortedPlaces.map((place, index) => (
            <div 
                key={place.place_id || index} 
                className={style.RestaurantCard}
                onClick={() => (navigate(`/Restaurants/${place.place_id}`), {state: {place}})} // 맛집 세부 조회 페이지로 이동
                style={{ cursor: "pointer" }} 
            >
                <img
                    src={
                        place.photos && place.photos.length > 0
                            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_KEY}`
                            : "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={place.name}
                />
                <h2>{place.name}</h2>
                <p>{place.formatted_address}</p>
                <p className={style.rating}>Rating: {place.rating || "N/A"}</p>
            </div>
        ));
    };

    useEffect(() => {
        fetchPlaceData("restaurant");
    }, [city, fetchPlaceData]);

    return (
        <div className={`Contents ${commonCss.Contents} ${style.RestaurantContainer}`}>
            <h1>맛집 목록</h1><br/>
            <form>
                <label htmlFor="city">도시 선택: </label>
                <select name="city" id="city" onChange={(e) => setCity(e.target.value)} value={city}>
                    <option value="seoul">서울</option>
                    <option value="hongkong">홍콩</option>
                    <option value="tokyo">도쿄</option>
                    <option value="osaka">오사카</option>
                    <option value="taipei">타이페이</option>
                    <option value="bangkok">방콕</option>
                    <option value="hanoi">하노이</option>
                    <option value="dubai">두바이</option>
                    <option value="bali">발리</option>
                    <option value="paris">파리</option>
                    <option value="roma">로마</option>
                    <option value="london">런던</option>
                    <option value="newyork">뉴욕</option>
                    <option value="barcelona">바르셀로나</option>
                </select>
            </form><br/>
            <form>
                <label htmlFor="sort">정렬 기준: </label>
                <select name="sort" id="sort" onChange={(e) => setSort(e.target.value)} value={sort}>
                    <option value="name">이름순</option>
                    <option value="rating">추천순</option>
                </select>
            </form><br/>
            <div >
                <button onClick={() => onClickHandler("restaurant")}>음식점</button>
                <button onClick={() => onClickHandler("tavern")}>술집</button>
                <button onClick={() => onClickHandler("cafe")}>카페</button>
            </div>
            {error && <p className="error">{error}</p>}
            <div className={style.RestaurantCardContainer}>{renderPlaceCards()}</div>
        </div>
    );
}

export default Restaurants;
