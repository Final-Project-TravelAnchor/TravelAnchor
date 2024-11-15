import React, { useState, useRef } from "react";
// import { getToken, getHotelsByCity, getHotelPrices } from "../api/amadeusApi";
import AccommodationCss from './Accommodation.module.css';
import { callAmadeusToken } from "../../apis/AmadeusFlightAPICalls";
import { callAmadeusHotelPrices, callAmadeusHotelsByCity } from "../../apis/AmadeusHotelsAPICalls";

function Accommodation() {
  const [res, setRes] = useState(null);
  const [hotelList, setHotelList] = useState([]);
  const [cityCode, setCityCode] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [roomQuantity, setRoomQuantity] = useState(1);

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
  };

  const onClickHandlerHotelPrices = async () => {
		console.log("ref : " , ref);

		const hotelDetailResponse = await callAmadeusHotelPrices("MCLONGHM", token, ref);
    console.log("hotelDetailResponse : " , hotelDetailResponse);
  };


  return (
    <div>
      <button onClick={onClickHandler}>누르고 시작하세요~</button>
			{token && <p>Token: {token}</p>}
      <input
        type="text"
        placeholder="도시 코드를 입력하세요 (예: SEL)"
        ref={ref.cityCode}
        // onChange={(e) => setCityCode(e.target.value.toUpperCase())}
      />
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
      <button onClick={onClickHandlerHotelPrices}>HotelPrice Search</button>
      
      {hotelList.length > 0 ? (
        <div>
          <h2>호텔 리스트</h2>
          <div className={AccommodationCss.cardContainer}>
            {hotelList.map((hotel, index) => (
              <div key={index} className={AccommodationCss.card}>
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
      )}
    </div>
  );
}

export default Accommodation;
