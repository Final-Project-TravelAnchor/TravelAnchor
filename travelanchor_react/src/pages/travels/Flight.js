import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { callAmadeusToken, callAmadeusFlightAPI, callAmadeusAirlineAPI } from "../../apis/AmadeusFlightAPICalls";
import './Flight.css';
import { callCountryAPI, callCityAPI } from '../../apis/AreaAPICalls';
import { useDispatch, useSelector } from "react-redux";
// import commonCss from '../../components/common/common.module.css';


export default function Flight() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const citiesObj = useSelector(state => state.cityReducer);
	// console.log("citiesObj : ", citiesObj);
	const cities = citiesObj.data;

	// console.log("cities : ", cities);

	const [ loading, setLoading ] = useState(true);
	const [loadingAirline, setLoadingAirline] = useState(false); // 항공사 로딩 상태

	// useEffect(() => {
	// 	setLoading(true);
	// 	dispatch(callCityAPI());
	// 	setLoading(false);
	// 	},
	// 	[]
	// );

	const [dots, setDots] = useState("");

  useEffect(() => {
    if (loadingAirline) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 5 ? prev + "." : ""));
      }, 500); // 500ms마다 업데이트

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }
  }, [loadingAirline]);

	useEffect(() => {
		const fetchCities = async () => {
			setLoading(true);
			await dispatch(callCityAPI());
			setLoading(false);
		};
	
		fetchCities();
	}, [dispatch]);

	// const [res, setRes] = useState(null); // 토큰 상태
	const [flight, setFlight] = useState([]); // 비행기 상태
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

	// const onClickHandler = async () => {
	// 	const tokenResponse = await callAmadeusToken(); 
	// 	setToken(tokenResponse.access_token);
	// 	console.log("token : " + tokenResponse.access_token);
	// };

	const onClickHandlerFlight = async () => {

		// 로딩 시작
		setLoadingAirline(true);

		let newToken = token;

		if(!token) {
			console.log('토큰이 없습니다. 발급을 시작합니다...');
			const tokenResponse = await callAmadeusToken();
			console.log(tokenResponse);
			newToken = tokenResponse.access_token;
			setToken(newToken); // 상태 업데이트
			console.log("새로 발급된 토큰: " + newToken);
		}

		// console.log("ref : " , ref);
		// console.log("ref : " , ref.originRef.current.value,);

		const flightResponse = await callAmadeusFlightAPI(newToken, ref);
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
			const airlineData = await callAmadeusAirlineAPI(newToken, { carrierCodeRef: code });
			airlineNames[code] = airlineData?.data?.[0]?.commonName || "Airline";
		}

		// 결과 확인
		console.log("항공사 이름 매핑 결과:", airlineNames);
		setAirlineData(airlineNames);

		// 로딩 종료
		setLoadingAirline(false);
	};

	return (
		<div className="filght-container">
			<h1 className="flight-title">항공권 최저가 검색</h1>
			<div className="flight-search-container">

			<div className="flight-content">
			{/* 입력 섹션 */}
			<div className="flight-form-section">
				{/* <button className="fetch-token-button" onClick={onClickHandler}>
				토큰받기
				</button> */}

				<div className="flight-form-group">
				<label>여행 유형</label>
				<select ref={ref.tripType} onChange={(e) => setTripType(e.target.value)}>
					<option value="one-way">편도</option>
					<option value="round-trip">왕복</option>
				</select>
				</div>

			{/* <div className="form-group">
			<label>출발지</label>
			<input type="text" ref={ref.originRef} placeholder="출발지를 입력하세요" />
			</div>

			<div className="form-group">
			<label>도착지</label>
			<input type="text" ref={ref.destinationRef} placeholder="도착지를 입력하세요" />
			</div> */}

			<div className="flight-form-group">
			<label>출발지</label>
			<select ref={ref.originRef}>
				{cities?.length > 0 ? (
					cities.map(city => (
						<option key={city.cityCode} value={city.cityIataCode}>{city.cityName}</option>
					))
				) : (
					<option>도시 데이터를 불러오는 중...</option>
				)}
			</select>
			</div>

			<div className="flight-form-group">
			<label>도착지</label>
			{/* <select ref={ref.destinationRef}>
				{cities.length > 0 && cities.map(city => (
				<option key={city.cityCode} value={city.cityIataCode}>{city.cityName}</option>
				))}
			</select> */}
			<select ref={ref.destinationRef}>
				{cities?.length > 0 ? (
					cities.map(city => (
						<option key={city.cityCode} value={city.cityIataCode}>{city.cityName}</option>
					))
				) : (
					<option>도시 데이터를 불러오는 중...</option>
				)}
			</select>
			</div>

			<div className="flight-form-group">
			<label>출발일</label>
			<input type="date" ref={ref.departureDateRef} />
			</div>

			{tripType === "round-trip" && (
			<div className="flight-form-group">
				<label>귀국일</label>
				<input type="date" ref={ref.returnDateRef} />
			</div>
			)}

			<div className="flight-form-group">
			<label>성인</label>
			<input type="number" ref={ref.adultsRef} min="1" defaultValue="1" />
			</div>

			<div className="flight-form-group">
			<label>아동</label>
			<input type="number" ref={ref.childrenRef} min="0" defaultValue="0" />
			</div>

			<div className="flight-form-group">
			<label>유아</label>
			<input type="number" ref={ref.infantsRef} min="0" defaultValue="0" />
			</div>

			<div className="flight-form-group">
			<label>좌석 등급</label>
			<select ref={ref.travelClassRef}>
				<option value="ECONOMY">Economy</option>
				<option value="PREMIUM_ECONOMY">Premium Economy</option>
				<option value="BUSINESS">Business</option>
				<option value="FIRST">First</option>
			</select>
			</div>

			<button className="flight-search-button" onClick={onClickHandlerFlight}>
			항공권 검색
			</button>
			</div>

			{/* 출력 섹션 */}
			<div className="flight-output-section">
			{!loadingAirline && !flight?.data && (
				<div className="loading">
				<p>조건을 입력하고 검색하시면 이곳에 항공권 정보가 출력됩니다 😊</p> 
				</div>
			)}
			{loadingAirline && (
				<div className="loading">
				<p>항공권 정보를 불러오는 중{dots}</p>
				</div>
			)}
			{!loadingAirline && flight && flight.data && (
			<div className="flight-card-container">
				{flight.data.map((offer, index) => {
				const carrierCode = offer.itineraries[0].segments[0].operating.carrierCode;
				const airlineName = airlineData[carrierCode] || "";

				return (
					<div key={index} className="flight-card">
					<h3 className="airline-name">{airlineName}</h3>
					<p className="flight-route">
						{offer.itineraries[0].segments[0].departure.iataCode} →{" "}
						{offer.itineraries[0].segments[0].arrival.iataCode}
					</p>
					<p className="flightprice">
						{offer.price.grandTotal} {offer.price.currency}
					</p>
					</div>
				);
				})}
			</div>
			)}
		</div>
		</div>
	</div>
		
	</div>
	);
}