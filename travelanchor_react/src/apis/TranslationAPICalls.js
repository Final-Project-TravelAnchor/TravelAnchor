export const callTranslation = async (text, sourceLanguage, targetLanguage) => {
	const url = 'https://translation.googleapis.com/language/translate/v2';

	const params = new URLSearchParams({
		key: process.env.REACT_APP_GOOGLE_API_KEY_T,
	});

	const body = {
		q: text,
		source: sourceLanguage,
		target: targetLanguage,
		format: 'text',
	};

	console.log("요청 데이터:", body);
	
	try {
		const response = await fetch(`${url}?${params.toString()}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		
		if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP 에러! 상태: ${response.status}, 메시지: ${errorText}`);
        }

        const data = await response.json();
        console.log("번역 응답 데이터:", data);
        return data; // 응답 데이터 반환
    } catch (error) {
        console.error("번역 API 호출 실패:", error);
        throw new Error("번역 API 호출에 실패했습니다.");
    }
};