import { useState } from "react";
// import './App.css'; 

function Main() {
  const [res, setRes] = useState(null); // 토큰 상태
  const [hotelList, setHotelList] = useState([]); // 호텔 리스트 상태를 빈 배열로 초기화
  const [cityCode, setCityCode] = useState(''); // 사용자 입력 도시 코드 상태
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [roomQuantity, setRoomQuantity] = useState(1);

  // 토큰 요청 함수
  async function getToken() {
    const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'K2WcVAIhpOegbRWCgLgafj7CFybrsoXS',
      client_secret: 'oGFe4LTekveNZrA4',
    }).toString();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      const data = await response.json();
      setRes(data);
      console.log("Access Token:", data.access_token);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // 호텔 리스트 조회 함수
  async function getHotel() {
    if (!res) {
      console.log('토큰이 없습니다. 먼저 토큰을 받아주세요.');
      return;
    }

    if (!cityCode) {
      console.log('도시 코드를 입력하세요.');
      return;
    }

    console.log("Searching for city code:", cityCode);

    const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=5&radiusUnit=KM&hotelSource=ALL`;
    const token = res.access_token;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (Array.isArray(data.data)) {
        setHotelList(data.data);
        getHotelPrices(data.data); // 호텔 리스트 가져온 후 가격 조회 함수 호출
      } else {
        setHotelList([]);
        console.warn('호텔 리스트 데이터가 배열 형식이 아닙니다:', data);
      }
      console.log("Hotel List Data:", data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // 호텔 가격 조회 함수
  async function getHotelPrices(hotels) {
    if (!res) return;
  
    const token = res.access_token;
    const updatedHotelList = [];
  
    for (const hotel of hotels) {
      const url = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotel.hotelId}&adults=${adults}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomQuantity=${roomQuantity}&currency=KRW&paymentPolicy=NONE&bestRateOnly=true`;
  
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        let foundPrice = null;
        let foundOfferId = null;
        let checkIn = null;
        let checkOut = null;
        let roomType = null;
  
        if (data.data && data.data.length > 0 && data.data[0].offers.length > 0) {
          const offer = data.data[0].offers[0]; // 첫 번째 오퍼를 선택
          foundPrice = offer.price.total || '가격 정보 없음';
          foundOfferId = offer.id;
          checkIn = offer.checkInDate;
          checkOut = offer.checkOutDate;
          roomType = offer.room.typeEstimated.category || '방 유형 정보 없음';
        }
  
        hotel.price = foundPrice;
        hotel.offerId = foundOfferId;
        hotel.checkInDate = checkIn;
        hotel.checkOutDate = checkOut;
        hotel.roomType = roomType;
  
        updatedHotelList.push(hotel);
      } catch (error) {
        console.error(`Error fetching price for hotel ${hotel.hotelId}:`, error);
        hotel.price = '가격 정보 오류';
        hotel.offerId = 'offerId 오류';
        hotel.checkInDate = '체크인 정보 오류';
        hotel.checkOutDate = '체크아웃 정보 오류';
        hotel.roomType = '방 유형 정보 오류';
      }
    }
  
    setHotelList(updatedHotelList);
  }

  return (
    <div>
      <button onClick={getToken}>Token Request</button>
      {res && <p>Token: {res.access_token}</p>}

      <input
        type="text"
        placeholder="도시 코드를 입력하세요 (예: SEL)"
        value={cityCode}
        onChange={(e) => setCityCode(e.target.value.toUpperCase())}
      />
      <input
        type="date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        placeholder="체크인 날짜"
      />
      <input
        type="date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        placeholder="체크아웃 날짜"
      />
      <input
        type="number"
        value={adults}
        onChange={(e) => setAdults(e.target.value)}
        placeholder="성인 수"
      />
      <input
        type="number"
        value={roomQuantity}
        onChange={(e) => setRoomQuantity(e.target.value)}
        placeholder="객실 수"
      />
      <button onClick={getHotel}>Hotel Search</button>
      
      {hotelList.length > 0 ? (
        <div>
          <h2>호텔 리스트</h2>
          <div className="card-container">
            {hotelList.map((hotel, index) => (
              <div key={index} className="card">
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

export default Main;
