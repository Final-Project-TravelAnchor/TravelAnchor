import { useEffect, useState, useRef } from "react";
// import { getToken, getHotelsByCity, getHotelPrices } from "../api/amadeusApi";
import { callAmadeusToken } from "../../apis/AmadeusFlightAPICalls";
import { callAmadeusHotelPrices, callAmadeusHotelsByCity } from "../../apis/AmadeusHotelsAPICalls";
import { callCountryAPI, callCityAPI } from '../../apis/AreaAPICalls';
import { useDispatch, useSelector } from "react-redux";
import './Accommodation.css';
import { useNavigate } from "react-router-dom";

function Accommodation() {
  const [res, setRes] = useState(null);
  const [hotelList, setHotelList] = useState([]);
  const [cityCode, setCityCode] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [ loading, setLoading ] = useState(true);

  const navigate = useNavigate();
	const dispatch = useDispatch();
	const citiesObj = useSelector(state => state.cityReducer);
  const cities = citiesObj.data;


  useEffect(() => {
		const fetchCities = async () => {
			setLoading(true);
			await dispatch(callCityAPI());
			setLoading(false);
		};
	
		fetchCities();
	}, [dispatch]);

  // 토큰 요청 함수
  // const handleGetToken = async () => {
  //   try {
  //     const tokenData = await AmadeusAPI.getToken();
  //     setRes(tokenData);
  //     console.log("Access Token:", tokenData.access_token);
  //   } catch (error) {
  //     console.error("토큰 요청 실패:", error);
  //   }
  // };

  // 호텔 리스트 조회 함수
  // const handleGetHotels = async () => {
  //   if (!res) {
  //     console.log('토큰이 없습니다. 먼저 토큰을 받아주세요.');
  //     return;
  //   }

  //   try {
  //     const hotels = await AmadeusAPI.getHotelsByCity(cityCode, res.access_token);
  //     const hotelsWithPrices = await AmadeusAPI.getHotelPrices(hotels, res.access_token, { checkInDate, checkOutDate, adults, roomQuantity });
  //     setHotelList(hotelsWithPrices);
  //     console.log("호텔 리스트:", hotelsWithPrices);
  //   } catch (error) {
  //     console.error("호텔 리스트 조회 실패:", error);
  //   }
  // };

	const [ token, setToken ] = useState();
	const onClickHandler = async () => {
		const tokenResponse = await callAmadeusToken(); 
		setToken(tokenResponse.access_token);
		console.log("token : " + tokenResponse.access_token);
	};


  const ref = {
    cityCode: useRef(null),
    checkInDate: useRef(null),
    checkOutDate: useRef(null),
    adults: useRef(null),
    roomQuantity: useRef(null),
  };
  
  const onClickHandlerHotelsByCity = async () => {
		console.log("ref : " , ref);

		const hotelsResponse = await callAmadeusHotelsByCity(token, ref);
    console.log("hotelsResponse : " , hotelsResponse);
    setHotelList(hotelsResponse);
  };


  const onClickHandlerHotelPrices = async () => {
		console.log("ref : " , ref);

		// const hotelDetailResponse = await callAmadeusHotelPrices( {hotelId}, token, ref);
    // console.log("hotelDetailResponse : " , hotelDetailResponse);

    // const hotelPrice = [...new Set(hotelsResponse.data.map(
    //   offer => offer.itineraries[0]?.segments[0]?.operating?.hotelId || "Unknown"
    // ))]

    setLoading(true);

  };

  const onClickHandlerHotelsAndPrices = async () => {
    if (!token) {
      console.error("Access Token이 없습니다.");
      return;
    }
  
    try {
      // 1. 도시별 호텔 조회
      const hotelsResponse = await callAmadeusHotelsByCity(token, ref);
      console.log("도시별 호텔 응답: ", hotelsResponse);
  
      if (!hotelsResponse || hotelsResponse.length === 0) {
        console.error("도시별 호텔 데이터를 찾을 수 없습니다.");
        return;
      }
  
      // 2. 호텔 ID 추출
      const hotelIds = hotelsResponse.map((hotel) => hotel.hotelId).join(",");
      console.log("추출된 호텔 ID들: ", hotelIds);
  
      // 3. 호텔 가격 조회
      const pricesResponse = await callAmadeusHotelPrices(token, { hotelIdRef: hotelIds }, ref);
      console.log("호텔 가격 응답: ", pricesResponse);
  
      // 4. 가격 데이터를 호텔 리스트에 병합
      const updatedHotelList = hotelsResponse.map((hotel) => {
        const matchingOffer = pricesResponse.data?.find(
          (offer) => offer.hotel?.hotelId === hotel.hotelId
        );
  
        return {
          ...hotel,
          price: matchingOffer?.offers?.[0]?.price?.total || "가격 정보 없음",
          roomType: matchingOffer?.offers?.[0]?.room?.typeEstimated?.category || "방 유형 정보 없음",
          checkInDate: matchingOffer?.offers?.[0]?.checkInDate || "체크인 날짜 정보 없음",
          checkOutDate: matchingOffer?.offers?.[0]?.checkOutDate || "체크아웃 날짜 정보 없음",
        };
      });
  
      console.log("최종 호텔 리스트: ", updatedHotelList);
      setHotelList(updatedHotelList);
    } catch (error) {
      console.error("도시별 호텔 및 가격 조회 중 오류: ", error);
    }
  };


  return (
    <div className="hotel-container">
      <h1 className="hotel-search-title">숙박 조회</h1>
      <button onClick={onClickHandler}>누르고 시작하세요~</button>
			{token && <p>Token: {token}</p>}
      {/* <input
        type="text"
        placeholder="도시 코드를 입력하세요 (예: SEL)"
        ref={ref.cityCode}
        // onChange={(e) => setCityCode(e.target.value.toUpperCase())}
      /> */}
      <select ref={ref.cityCode}>
				{cities?.length > 0 ? (
					cities.map(city => (
						<option key={city.cityCode} value={city.cityIataCode}>{city.cityName}</option>
					))
				) : (
					<option>도시 데이터를 불러오는 중...</option>
				)}
			</select>
      <button onClick={onClickHandlerHotelsByCity}>City Hotel Search</button>

      <input
        type="date"
        // value={checkInDate}
        ref={ref.checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        placeholder="체크인 날짜"
      />
      <input
        type="date"
        // value={checkOutDate}
        ref={ref.checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        placeholder="체크아웃 날짜"
      />
      <input
        type="text"
        // value={adults}
        ref={ref.adults}
        onChange={(e) => setAdults(e.target.value)}
        placeholder="성인 수"
      />
      <input
        type="text"
        // value={roomQuantity}
        ref={ref.roomQuantity}
        onChange={(e) => setRoomQuantity(e.target.value)}
        placeholder="객실 수"
      />
      <button onClick={onClickHandlerHotelsAndPrices}>HotelPrice Search</button>
      
      {/* {hotelList.length > 0 ? (
        <div>
          <h2>호텔 리스트</h2>
          <div className="">
            {hotelList.map((hotel, index) => (
              <div key={index} className="">
                <h3>{hotel.name}</h3>
                <p>체크인 날짜: {hotel.checkInDate || '정보 없음'}</p>
                <p>체크아웃 날짜: {hotel.checkOutDate || '정보 없음'}</p>
                <p>방 유형: {hotel.roomType || '정보 없음'}</p>
                <p>가격: {hotel.price || '가격 정보 없음'}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>호텔 데이터를 찾을 수 없습니다.</p>
      )} */}
      {hotelList.length > 0 ? (
  <div>
    <h2>호텔 리스트</h2>
    {hotelList.map((hotel, index) => (
      <div key={index}>
        <h3>{hotel.name}</h3>
        <p>체크인 날짜: {hotel.checkInDate}</p>
        <p>체크아웃 날짜: {hotel.checkOutDate}</p>
        <p>방 유형: {hotel.roomType}</p>
        <p>가격: {hotel.price}</p>
      </div>
    ))}
  </div>
) : (
  <p>호텔 데이터를 찾을 수 없습니다.</p>
)}
    </div>
  );
}

export default Accommodation;
