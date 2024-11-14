import { useState, useRef } from "react";

function Flight() {
	const [res, setRes] = useState(null); // 토큰 상태
	const [flight, setFlight] = useState(null); // 비행기 상태
	const [tripType, setTripType] = useState("one-way"); // 여행 유형 상태

	// Ref 생성
	const originRef = useRef(null);
	const destinationRef = useRef(null);
	const departureDateRef = useRef(null);
	const returnDateRef = useRef(null);
	const adultsRef = useRef(null);
	const childrenRef = useRef(null);
	const infantsRef = useRef(null);
	const travelClassRef = useRef(null);

	// 토큰 요청 함수
	async function getToken() {
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
			setRes(data);
		} catch (error) {
			console.error('Token 요청 실패:', error);
		}
	}

	// 항공편 검색 함수
	async function getFlight() {
		if (!res) {
			console.log('토큰이 없습니다. 먼저 토큰을 받아주세요.');
			return;
		}

		const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
		const params = new URLSearchParams({
			originLocationCode: originRef.current.value,
			destinationLocationCode: destinationRef.current.value,
			departureDate: departureDateRef.current.value,
			...(tripType === "round-trip" && {
				returnDate: returnDateRef.current.value,
			}),
			adults: adultsRef.current.value,
			children: childrenRef.current.value,
			infants: infantsRef.current.value,
			travelClass: travelClassRef.current.value,
			nonStop: true,
			max: 100,
			currencyCode: 'KRW',
		}).toString();

		try {
			const response = await fetch(`${url}?${params}`, {
				headers: {
					'Authorization': `Bearer ${res.access_token}`,
				},
			});
			const data = await response.json();
			setFlight(data);
		} catch (error) {
			console.error('항공편 검색 실패:', error);
		}
	}

	const styles = {
		cardContainer: {
			display: 'flex',
			flexWrap: 'wrap',
			gap: '20px',
		},
		card: {
			border: '1px solid #ccc',
			borderRadius: '8px',
			padding: '16px',
			width: '200px',
			boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
		},
	};

	return (
		<div>
			<h1>항공권 최저가 검색</h1>
			<button onClick={getToken}>Token Request</button>
			{res && <p>Token: {res.access_token}</p>}

			<div>
				<label>여행 유형</label>
				<select
					value={tripType}
					onChange={(e) => setTripType(e.target.value)}
				>
					<option value="one-way">편도</option>
					<option value="round-trip">왕복</option>
				</select>
			</div>
			<div>
				<label>출발지</label>
				<input type="text" ref={originRef} placeholder="출발지를 입력하세요" />
			</div>
			<div>
				<label>도착지</label>
				<input type="text" ref={destinationRef} placeholder="도착지를 입력하세요" />
			</div>
			<div>
				<label>출발일</label>
				<input type="date" ref={departureDateRef} />
			</div>

			{/* 왕복일 선택 옵션 */}
			{tripType === "round-trip" && (
				<div>
					<label>귀국일</label>
					<input type="date" ref={returnDateRef} />
				</div>
			)}

			<div>
				<label>성인</label>
				<input type="number" ref={adultsRef} min="1" defaultValue="1" />
			</div>
			<div>
				<label>아동</label>
				<input type="number" ref={childrenRef} min="0" defaultValue="0"/>
			</div>
			<div>
				<label>유아</label>
				<input type="number" ref={infantsRef} min="0" defaultValue="0"/>
			</div>
			<div>
				<label>좌석 등급</label>
				<select ref={travelClassRef}>
					<option value="ECONOMY">Economy</option>
					<option value="PREMIUM_ECONOMY">Premium Economy</option>
					<option value="BUSINESS">Business</option>
					<option value="FIRST">First</option>
				</select>
			</div>

			<button onClick={getFlight}>항공권 검색</button>

			{flight && flight.data && (
				<div style={styles.cardContainer}>
					{flight.data.map((offer, index) => (
						<div key={index} style={styles.card}>
							<h3>
								{offer.itineraries[0].segments[0].operating.carrierCode}
								<br/>
								{offer.itineraries[0].segments[0].departure.iataCode} to{" "}
								{offer.itineraries[0].segments[0].arrival.iataCode}
							</h3>
							<p>{offer.price.grandTotal} {offer.price.currency}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Flight;