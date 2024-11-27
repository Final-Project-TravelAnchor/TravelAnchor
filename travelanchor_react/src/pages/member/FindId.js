import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FindIdCSS from './FindId.module.css';
import { callFindIdAPI } from '../../apis/MemberAPICalls';

function FindId() {

    const inputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mobileNumber, setMobileNumber] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (message) {
            inputRef.current.focus();
        }
    }, [message]);

    const onChangeHandler = (e) => {
        const value = e.target.value;
        // 포맷팅된 핸드폰 번호로 변환
        const formattedValue = value
            .replace(/[^0-9]/g, '') // 숫자만 남기기
            .replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3'); // 포맷팅
        
            if (formattedValue.length <= 13) {
                setMobileNumber(formattedValue);
            } else {
                setMessage("핸드폰 번호는 13자리를 초과할 수 없습니다."); // 메시지 설정
                inputRef.current.focus(); // 입력창에 포커스
            }
    };

    const onClickFindIdHandler = async () => {
        try {
            const foundId = await dispatch(callFindIdAPI({ mobileNumber })); // API 호출
            setMessage(`찾은 아이디 : ${foundId}`); // 아이디 찾기 성공 메시지
        } catch (error) {
            setMessage(error.message); // 에러 메시지
        }
    };

    const onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            onClickFindIdHandler();
        }
    };

    return (
        <div className={FindIdCSS.FindIdbackgroundDiv}>
            <div className={FindIdCSS.overlay}></div>
            <div className={FindIdCSS.findIdContainer}>
            <h2 className={FindIdCSS.findIdTitle}>아이디 찾기</h2>
            <p>가입 시 등록한 휴대폰 번호를 입력하면<br />
                아이디를 알려드립니다.
            </p>
            <img src="/images/main/lock.png" alt="lock" className={FindIdCSS.lockImage} />
                <input
                    type="text"
                    placeholder="휴대전화 번호"
                    value={mobileNumber}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    maxLength={13}
                    ref={inputRef}
                />
                {message && <p className={FindIdCSS.errorMessage}>{message}</p>}
                <button className={FindIdCSS.findIdButton} onClick={onClickFindIdHandler}>아이디 찾기</button>
            </div>
        </div>
    );
}

export default FindId;