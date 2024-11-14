


export async function getToken() {
  const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.REACT_APP_AMADEUS_API_KEY,
    client_secret: process.env.REACT_APP_AMADEUS_API_SECRET,
  }).toString();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
}

export async function getHotelsByCity(cityCode, token) {
  const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=5&radiusUnit=KM&hotelSource=ALL`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
}

export async function getHotelPrices(hotels, token, { checkInDate, checkOutDate, adults, roomQuantity }) {
  const updatedHotelList = [];

  for (const hotel of hotels) {
    const url = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotel.hotelId}&adults=${adults}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomQuantity=${roomQuantity}&currency=KRW&paymentPolicy=NONE&bestRateOnly=true`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const offer = data.data?.[0]?.offers?.[0] || {};

      hotel.price = offer.price?.total || '가격 정보 없음';
      hotel.offerId = offer.id;
      hotel.checkInDate = offer.checkInDate;
      hotel.checkOutDate = offer.checkOutDate;
      hotel.roomType = offer.room?.typeEstimated?.category || '방 유형 정보 없음';

      updatedHotelList.push(hotel);
    } catch (error) {
      console.error(`Error fetching price for hotel ${hotel.hotelId}:`, error);
      hotel.price = '가격 정보 오류';
      hotel.offerId = 'offerId 오류';
      hotel.checkInDate = '체크인 정보 오류';
      hotel.checkOutDate = '체크아웃 정보 오류';
      hotel.roomType = '방 유형 정보 오류';
      updatedHotelList.push(hotel);
    }
  }

  return updatedHotelList;
}

export default { getToken, getHotelsByCity, getHotelPrices };
