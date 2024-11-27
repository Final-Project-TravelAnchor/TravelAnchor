
// 도시별 호텔 조회
export const callAmadeusHotelsByCity = async (access_token, ref) => {

	console.log("ref : ", ref);
	console.log("access_token : ", access_token);

  const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city`;
  const params = new URLSearchParams({
    cityCode: ref.cityCode.current?.value || '',
    radius: 5,
    radiusUnit: 'KM',
    hotelSource: 'ALL',
  })

  console.log("호텔조회 url:", `${url}?${params.toString()}`);

  try {
    const response = await fetch(`${url}?${params}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }

};

export const callAmadeusHotelPrices = async (access_token, {hotelIdRef},ref) => {

  console.log("hotelId : ", hotelIdRef);
  // console.log("access_token : ", access_token);

  if (!hotelIdRef) {
    console.error("조회가능한 호텔 아이디가 없습니다!");
    return null; // 코드가 없으면 API 호출 중단
}

  const url = 'https://test.api.amadeus.com/v3/shopping/hotel-offers';
  const params = new URLSearchParams({
    hotelIds: hotelIdRef,
    adults: ref.adults.current?.value || '',
    checkInDate: ref.checkInDate.current?.value || '',
    checkOutDate: ref.checkOutDate.current?.value || '',
    roomQuantity: ref.roomQuantity.current?.value || '',
    currency: 'KRW',
    paymentPolicy: 'NONE',
    bestRateOnly: 'true',
  })
  // const requestURL = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelId}&adults=${ref.adults.current.value}&checkInDate=${ref.checkInDate.current.value}&checkOutDate=${ref.checkOutDate.current.value}&roomQuantity=${ref.roomQuantity.current.value}&currency=KRW&paymentPolicy=NONE&bestRateOnly=true`;
  console.log("호텔가격검색 url : ", `${url}?${params}`);
  try {
    const response = await fetch(`${url}?${params}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
//   const updatedHotelList = [];


//       const data = await response.json();
//       const offer = data.data?.[0]?.offers?.[0] || {};

//       hotel.price = offer.price?.total || '가격 정보 없음';
//       hotel.offerId = offer.id;
//       hotel.checkInDate = offer.checkInDate;
//       hotel.checkOutDate = offer.checkOutDate;
//       hotel.roomType = offer.room?.typeEstimated?.category || '방 유형 정보 없음';

//       updatedHotelList.push(hotel);
//     } catch (error) {
//       console.error(`Error fetching price for hotel ${hotel.hotelId}:`, error);
//       hotel.price = '가격 정보 오류';
//       hotel.offerId = 'offerId 오류';
//       hotel.checkInDate = '체크인 정보 오류';
//       hotel.checkOutDate = '체크아웃 정보 오류';
//       hotel.roomType = '방 유형 정보 오류';
//       updatedHotelList.push(hotel);
//     }
//   }

//   return updatedHotelList;
// }

