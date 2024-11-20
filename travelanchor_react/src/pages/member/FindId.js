import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FindIdCSS from './FindId.module.css'; // 스타일 파일
import { callFindIdAPI } from '../../apis/MemberAPICalls'; // API 호출 import

function FindId() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mobileNumber, setMobileNumber] = useState("");
    const [message, setMessage] = useState("");

    const onChangeHandler = (e) => {
        const value = e.target.value;
        // 포맷팅된 핸드폰 번호로 변환
        const formattedValue = value
            .replace(/[^0-9]/g, '') // 숫자만 남기기
            .replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3'); // 포맷팅
        
        // 자리 수가 13자를 초과하지 않도록 체크
        if (formattedValue.length <= 13) {
            setMobileNumber(formattedValue);
        }
    };

    const onClickFindIdHandler = async () => {
        try {
            const foundId = await dispatch(callFindIdAPI({ mobileNumber })); // API 호출
            setMessage(`찾은 아이디: ${foundId}`); // 아이디 찾기 성공 메시지
        } catch (error) {
            setMessage(error.message); // 에러 메시지
        }
    };

    return (
        <div className={FindIdCSS.backgroundDiv}>
            <h1>아이디 찾기</h1>
            <div className={FindIdCSS.inputContainer}>
                <input
                    type="text"
                    placeholder="휴대전화 번호"
                    value={mobileNumber}
                    onChange={onChangeHandler}
                    maxLength={13} // 최대 길이 설정
                />
                <button onClick={onClickFindIdHandler}>아이디 찾기</button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default FindId;