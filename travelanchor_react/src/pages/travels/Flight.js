import { useState, useRef } from "react";
import { callAmadeusToken, callAmadeusFlightAPI, callAmadeusAirlineAPI } from "../../apis/AmadeusFlightAPICalls";
import style from './Flight.module.css';

export default function Flight() {

	// const [res, setRes] = useState(null); // 토큰 상태
	const [flight, setFlight] = useState(null); // 비행기 상태
	const [tripType, setTripType] = useState("one-way"); // 여행 유형 상태
	const [airlineData, setAirlineData] = useState({});

	// Ref 생성
	// const originRef = useRef(null);
	// const destinationRef = useRef(null);
	// const departureDateRef = useRef(null);
	// const returnDateRef = useRef(null);
	// const adultsRef = useRef(null);
	// const childrenRef = useRef(null);
	// const infantsRef = useRef(null);
	// const travelClassRef = useRef(null);

	const ref = {
		originRef: useRef(null),
		destinationRef: useRef(null),
		departureDateRef: useRef(null),
		returnDateRef: useRef(null),
		adultsRef: useRef(null),
		childrenRef: useRef(null),
		infantsRef: useRef(null),
		travelClassRef: useRef(null),
		tripType: useRef(null),
	};

	const [ token, setToken ] = useState();

	const onClickHandler = async () => {
		const tokenResponse = await callAmadeusToken(); 
		setToken(tokenResponse.access_token);
		console.log("token : " + tokenResponse.access_token);
	};

	const onClickHandlerFlight = async () => {
		if (!token) {
			console.log('토큰이 없습니다. 먼저 토큰을 받아주세요.');
			return;
		}
		
		// console.log("ref : " , ref);
		// console.log("ref : " , ref.originRef.current.value,);

		const flightResponse = await callAmadeusFlightAPI(token, ref);
		console.log("비행편 : ", flightResponse);
		setFlight(flightResponse);	// fight 상태에 응답 데이터 저장

		// 항공사 코드 리스트 추출
		const airlineCodes = [...new Set(flightResponse.data.map(
			offer => offer.itineraries[0]?.segments[0]?.operating?.carrierCode || "Unknown"
		))];

		// 항공사 이름 매핑
		const airlineNames = {};
		for (const code of airlineCodes) {
			if (code === "Unknown") continue; // 코드가 없으면 스킵
			const airlineData = await callAmadeusAirlineAPI(token, { carrierCodeRef: code });
			airlineNames[code] = airlineData?.data?.[0]?.commonName || "Unknown Airline";
		}

		// 결과 확인
		console.log("항공사 이름 매핑 결과:", airlineNames);
		setAirlineData(airlineNames);
	};

		return (
			<div>
				<h1>항공권 최저가 검색</h1>
				<button onClick={onClickHandler}>토큰받기</button>
				{/* {token && <p>Token: {token}</p>} */}
	
				<div>
					<label>여행 유형</label>
					<select
						// value={tripType}
						ref={ref.tripType}
						onChange={(e) => setTripType(e.target.value)}
					>
						<option value="one-way">편도</option>
						<option value="round-trip">왕복</option>
					</select>
				</div>
				<div>
					<label>출발지</label>
					<input type="text" ref={ref.originRef} placeholder="출발지를 입력하세요" />
				</div>
				<div>
					<label>도착지</label>
					<input type="text" ref={ref.destinationRef} placeholder="도착지를 입력하세요" />
				</div>
				<div>
					<label>출발일</label>
					<input type="date" ref={ref.departureDateRef} />
				</div>
	
				{/* 왕복일 선택 옵션 */}
				{tripType === "round-trip" && (
					<div>
						<label>귀국일</label>
						<input type="date" ref={ref.returnDateRef} />
					</div>
				)}
	
				<div>
					<label>성인</label>
					<input type="number" ref={ref.adultsRef} min="1" defaultValue="1" />
				</div>
				<div>
					<label>아동</label>
					<input type="number" ref={ref.childrenRef} min="0" defaultValue="0"/>
				</div>
				<div>
					<label>유아</label>
					<input type="number" ref={ref.infantsRef} min="0" defaultValue="0"/>
				</div>
				<div>
					<label>좌석 등급</label>
					<select ref={ref.travelClassRef}>
						<option value="ECONOMY">Economy</option>
						<option value="PREMIUM_ECONOMY">Premium Economy</option>
						<option value="BUSINESS">Business</option>
						<option value="FIRST">First</option>
					</select>
				</div>
	
				<button onClick={onClickHandlerFlight}>항공권 검색</button>
	
				{flight && flight.data && (
				<div className={style.cardContainer}>
					{flight.data.map((offer, index) => {
					const carrierCode = offer.itineraries[0].segments[0].operating.carrierCode;
					const airlineName = airlineData[carrierCode] || "Unknown Airline"; // 항공사 이름 매핑

					return (
						<div key={index} className={style.card}>
						<h3>
							{airlineData[offer.itineraries[0].segments[0].operating.carrierCode] || "Unknown Airline"}
							<br />
							{offer.itineraries[0].segments[0].departure.iataCode} to{" "}
							{offer.itineraries[0].segments[0].arrival.iataCode}
						</h3>
						<p>{offer.price.grandTotal} {offer.price.currency}</p>
						</div>
					);
					})}
				</div>
				)}
			</div>
		);
	};
