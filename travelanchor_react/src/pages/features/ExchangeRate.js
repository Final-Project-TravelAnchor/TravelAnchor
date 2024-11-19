import { useState, useEffect } from "react";
import { callExchangeRate } from "../../apis/ExchangeRateAPICalls";
import "./ExchangeRate.css";

function ExchangeRate() {
	const [rates, setRates] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
	const [error, setError] = useState(null); // 에러 상태 추가

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

	return (
		<div className="exchange-rate-grid">
			<h1 className="exchange-rate-h1">환율</h1>
			
			{/* 로딩 중인 상태 처리 */}
			{isLoading ? (
				<p>환율 데이터를 불러오는 중입니다...</p>
			) : error ? (
				// 에러 발생 시 처리
				<p>{error}</p>
			) : (
				// 데이터가 있을 때 처리
				rates.length > 0 ? (
					rates.map((rate, index) => (
						<div className="exchange-rate-card" key={index}>
							<h3>
								{rate.cur_nm} <span>{rate.cur_unit}</span>
							</h3>
							<p>
								{rate.deal_bas_r
									? parseFloat(rate.deal_bas_r.replace(/,/g, '')).toLocaleString()
									: "N/A"}{" "}
								원
							</p>
						</div>
					))
				) : (
					<p>환율 정보를 찾을 수 없습니다.</p>
				)
			)}
		</div>
	);
}

export default ExchangeRate;