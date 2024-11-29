import { useState, useEffect } from "react";
import { callExchangeRate } from "../../apis/ExchangeRateAPICalls";
import "./ExchangeRate.css";

function ExchangeRate() {
	const [rates, setRates] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
	const [error, setError] = useState(null); // 에러 상태 추가
	const [amount, setAmount] = useState(1);
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("KRW");
	const [convertedAmount, setConvertedAmount] = useState(null);

	useEffect(() => {
		const fetchRates = async () => {
			try {
				const data = await callExchangeRate();
				setRates(data); // API에서 받아온 데이터 저장
				setIsLoading(false); // 데이터가 로드되면 로딩 상태 해제
			} catch (error) {
				console.error("환율 데이터를 불러오지 못했습니다:", error);
				setError("환율 데이터를 불러오는 데 실패했습니다."); // 에러 메시지 상태 설정
				setIsLoading(false); // 로딩 상태 해제
			}
		};

		fetchRates();
	}, []);

	const handleAmountChange = (e) => {
		setAmount(e.target.value);
	};

	const handleFromCurrencyChange = (e) => {
		setFromCurrency(e.target.value);
	};

	const handleToCurrencyChange = (e) => {
		setToCurrency(e.target.value);
	};

	// const calculateConversion = () => {
	// 	if (rates.length > 0) {
	// 		const fromRate = rates.find((rate) => rate.cur_unit === fromCurrency);
	// 		const toRate = rates.find((rate) => rate.cur_unit === toCurrency);
		
	// 			if (fromRate && toRate) {
	// 			const converted = (amount / parseFloat(fromRate.deal_bas_r.replace(/,/g, ''))) * parseFloat(toRate.deal_bas_r.replace(/,/g, ''));
	// 			setConvertedAmount(converted.toLocaleString());
	// 			}
	// 		}
	// 	};

	const calculateConversion = () => {
		if (rates.length > 0) {
			const fromRate = rates.find((rate) => rate.cur_unit === fromCurrency);
			const toRate = rates.find((rate) => rate.cur_unit === toCurrency);
		
			if (fromRate && toRate) {
				// 출발 통화 금액을 KRW로 변환한 후, 목적 통화로 변환
				const fromRateValue = parseFloat(fromRate.deal_bas_r.replace(/,/g, ''));
				const toRateValue = parseFloat(toRate.deal_bas_r.replace(/,/g, ''));
		
				// 출발 통화가 KRW일 경우
				if (fromCurrency === "KRW") {
				setConvertedAmount((amount / toRateValue).toLocaleString(undefined, { minimumFractionDigits: 2 }));
				} 
				// 목적 통화가 KRW일 경우
				else if (toCurrency === "KRW") {
				setConvertedAmount((amount * fromRateValue).toLocaleString(undefined, { minimumFractionDigits: 2 }));
				} 
				// 출발 통화와 목적 통화 모두 KRW가 아닐 경우
				else {
				const convertedToKRW = amount * fromRateValue; // 출발 통화를 KRW로 변환
				const convertedAmount = convertedToKRW / toRateValue; // KRW에서 목적 통화로 변환
				setConvertedAmount(convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }));
				}
			} else {
				setConvertedAmount("잘못된 통화입니다.");
			}
			} else {
			setConvertedAmount("환율 데이터를 불러오지 못했습니다.");
			}
		};

		return (
			<div className="exchange-rate-container">
				<h1 className="exchange-h1">환율</h1>
				<div className="exchange-rate-content">
					{/* 환율 카드 섹션 */}
					<div className="exchange-rate-cards">
						{isLoading ? (
							<p>환율 데이터를 불러오는 중입니다...</p>
						) : (
							rates.map((rate, index) => (
								<div className="exchange-rate-card" key={index}>
									<h3>
										{rate.cur_nm} <span>{rate.cur_unit}</span>
									</h3>
									<p>
										{rate.deal_bas_r
											? parseFloat(rate.deal_bas_r.replace(/,/g, "")).toLocaleString()
											: "N/A"}{" "}
										원
									</p>
								</div>
							))
						)}
					</div>
	
					{/* 환율 계산기 섹션 */}
					<div className="exchange-rate-calculator">
						<h2 className="exchange-h2">환율계산기</h2>
						<div className="calculator-inputs">
							<select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
								{rates.map((rate) => (
									<option key={rate.cur_unit} value={rate.cur_unit}>
										{rate.cur_nm} ({rate.cur_unit})
									</option>
								))}
							</select>
							<input
								type="number"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
							<span className="result">=</span>
							<select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
								{rates.map((rate) => (
									<option key={rate.cur_unit} value={rate.cur_unit}>
										{rate.cur_nm} ({rate.cur_unit})
									</option>
								))}
							</select>
							<p className="result">{convertedAmount || "결과"}</p>
						</div>
						<button onClick={calculateConversion} className="convert-button">
							💳 계산하기
						</button>
					</div>
				</div>
			</div>
		);
	}
	
	export default ExchangeRate;