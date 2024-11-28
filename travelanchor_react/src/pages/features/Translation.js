import { useState, useRef } from "react";
import { callTranslation } from "../../apis/TranslationAPICalls";
import "./Translation.css";


export default function Translation() {

	const [translation, setTranslation] = useState("");
	const [text, setText] = useState(""); // 입력 텍스트 상태
    const sourceRef = useRef(null); // 입력 언어
    const targetRef = useRef(null); // 출력 언어

	const onClickHandler = async () => {
        try {
            const sourceLanguage = sourceRef.current.value;
            const targetLanguage = targetRef.current.value;

            console.log("입력 언어:", sourceLanguage, "출력 언어:", targetLanguage, "텍스트:", text);

            const translateResponse = await callTranslation(text, sourceLanguage, targetLanguage);
            console.log("번역 결과:", translateResponse);

            setTranslation(translateResponse.data.translations[0].translatedText); // 번역된 텍스트 저장
        } catch (error) {
            console.error("번역 오류:", error);
        }
    };

	return (
        <div className="translation-container">
            <h1 className="translation-title">텍스트 번역</h1>
    
            {/* 언어 선택 그룹 */}
            <div className="translation-language-wrapper">
                {/* 입력 언어 */}
                <div className="translation-input-group">
                    <select ref={sourceRef} className="translation-select">
                        <option value="ko">한국어</option>
                        <option value="en">영어</option>
                        <option value="ja">일본어</option>
                        <option value="zh">중국어</option>
                        <option value="fr">프랑스어</option>
                        <option value="es">스페인어</option>
                        <option value="th">태국어</option>
                        <option value="mn">몽골어</option>
                    </select>
                </div>
    
                {/* 화살표 */}
                <div className="translation-arrow">
                    <span>→</span>
                </div>
    
                {/* 출력 언어 */}
                <div className="translation-input-group">
                    <select ref={targetRef} className="translation-select" defaultValue="en">
                        <option value="en">영어</option>
                        <option value="ko">한국어</option>
                        <option value="ja">일본어</option>
                        <option value="zh">중국어</option>
                        <option value="fr">프랑스어</option>
                        <option value="es">스페인어</option>
                        <option value="th">태국어</option>
                        <option value="mn">몽골어</option>
                    </select>
                </div>
            </div>
    
            {/* 텍스트 입력 및 출력 */}
            <div className="translation-text-wrapper">
                <textarea
                    className="translation-textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="번역할 텍스트를 입력하세요!"
                />
                <textarea
                    className="translation-textarea translation-result"
                    value={translation || ""}
                    readOnly
                    placeholder="번역된 텍스트가 여기 표시됩니다 😊"
                />
            </div>
    
            {/* 번역 실행 버튼 */}
            <button onClick={onClickHandler} className="translation-button">
                번역하기
            </button>
        </div>
    );
}