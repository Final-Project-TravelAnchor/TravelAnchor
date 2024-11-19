export const callExchangeRate = async () => {
	// const url = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON';
	const params = new URLSearchParams({
		authkey: process.env.REACT_APP_EXCHANGE_RATE_KEY,
		data: "AP01",
	});
	
	// const requestURL = `${url}?${params.toString()}`;
	const requestURL = `/site/program/financial/exchangeJSON?${params.toString()}`;
	console.log("API 호출 URL:", requestURL);

	try {
		const response = await fetch(requestURL);

		if (!response.ok) {
			console.error(`HTTP 오류! 상태: ${response.status}, 상태 메시지: ${response.statusText}`);
			throw new Error(`HTTP 오류! 상태: ${response.status}`);
		}
	
		const data = await response.json();
		console.log("API 응답 데이터:", data);
	
		// 데이터가 배열일 경우 처리
		if (Array.isArray(data) && data.length > 0) {
			return data.map(item => ({
				cur_nm: item.cur_nm,       // 화폐 이름
				cur_unit: item.cur_unit,   // 화폐 단위
				deal_bas_r: item.deal_bas_r // 거래 기준 환율
			}));
		} else {
			throw new Error("환율 정보를 가져올 수 없습니다.");
		}
	} catch (error) {
		console.error("API 호출에 실패했습니다:", error);
		throw new Error("API 호출에 실패했습니다.");
	}
};