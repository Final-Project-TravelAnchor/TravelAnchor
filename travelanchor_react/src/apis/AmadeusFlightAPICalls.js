
// 토큰 요청 함수
export const callAmadeusToken = async () => {
	const requestURL = 'https://test.api.amadeus.com/v1/security/oauth2/token';
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
	};

	const body = new URLSearchParams({
		grant_type: 'client_credentials',
		client_id: process.env.REACT_APP_AMADEUS_API_KEY,
		client_secret: process.env.REACT_APP_AMADEUS_API_SECRET,
	}).toString();

	try {
		console.log("Request");
		const response = await fetch(requestURL, {
			method: 'POST',
			headers: headers,
			body: body,
		});

		console.log("Response");
		// console.log(await response.json());

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data);
		return data; // If you need to return the data
	} catch (error) {
		console.error('Token 요청 실패:', error);
		throw error; // Optionally, rethrow the error if needed
	}
};

// 항공편 검색 함수
export const callAmadeusFlightAPI = async (access_token, ref) => {

	console.log("ref : ", ref);
	console.log("access_token : ", access_token);

	const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
	const params = new URLSearchParams({
		originLocationCode: ref.originRef.current?.value || '',
		destinationLocationCode: ref.destinationRef.current?.value || '',
		departureDate: ref.departureDateRef.current?.value || '',
		adults: ref.adultsRef.current?.value || '1',
		children: ref.childrenRef.current?.value || '0',
		infants: ref.infantsRef.current?.value || '0',
		nonStop: false,
		max: 100,
		currencyCode: 'KRW',
	});

	if (ref.tripType.current?.value === 'round-trip') {
		params.append('returnDate', ref.returnDateRef.current?.value || '');
	}

	console.log("url:", `${url}?${params.toString()}`);
	//back
	//https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=ICN&destinationLocationCode=BKK&departureDate=2024-11-15&adults=1&returnDate=2024-11-16&nonStop=true&max=100&children=0&infants=0&travelClass=&currencyCode=KRW

	//postman
	//https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-11-15&adults=1&returnDate=2024-11-17&nonStop=false&max=250

	try {
		// console.log("test");
		const response = await fetch(`${url}?${params}`, {
			headers: {
				'Authorization': `Bearer ${access_token}`,
			},
		});

		console.log("response:", response);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('항공편 검색 실패:', error);
		throw error;
	}
};

// 항공사 조회
export const callAmadeusAirlineAPI = async (access_token, { carrierCodeRef }) => {
    console.log("API 호출 시작 - 항공사 코드:", carrierCodeRef);
    
    if (!carrierCodeRef) {
        console.error("항공사 코드가 없습니다!");
        return null; // 코드가 없으면 API 호출 중단
    }

    const url = 'https://test.api.amadeus.com/v1/reference-data/airlines';
    const params = new URLSearchParams({
        airlineCodes: carrierCodeRef,
    });

    try {
        const response = await fetch(`${url}?${params}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });

        if (!response.ok) {
            console.error(`HTTP Error: ${response.status}`);
            return null;
        }

        const data = await response.json();
        console.log("받은 데이터:", data);
        return data;
    } catch (error) {
        console.error('항공사 조회 실패:', error);
        throw error;
    }
};


