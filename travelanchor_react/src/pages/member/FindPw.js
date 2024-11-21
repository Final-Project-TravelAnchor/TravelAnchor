import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callFindPwAPI, callResetPwAPI } from '../../apis/MemberAPICalls';
import FindPwCSS from './FindPw.module.css';

function FindPw() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mobileNumber, setMobileNumber] = useState("");
    const [message, setMessage] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const formattedValue = value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
        
        if (formattedValue.length <= 13) {
            setMobileNumber(formattedValue);
        }
    };

    const onClickFindPwHandler = async () => {
        try {
            const verificationCode = await dispatch(callFindPwAPI({ mobileNumber })); 
            setMessage(`비밀번호 찾기 성공 : 코드 ${verificationCode}`);
            setIsCodeSent(true);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const onResetPasswordHandler = async () => {
        if(!newPassword) {
            setMessage("새로운 비밀번호를 입력해주세요.");
            return;
        }

        try {
            await dispatch(callResetPwAPI({ mobileNumber, verificationCode, newPassword })); 
            alert("비밀번호 변경이 완료되었습니다.");
            navigate('/login');
        } catch (error) {
            setMessage(error.message);
        }
    };


    return (
        <div className={FindPwCSS.backgroundDiv}>
            <h1>비밀번호 찾기</h1>
            <div className={FindPwCSS.inputContainer}>
                <input
                    type="text"
                    placeholder="휴대전화 번호"
                    value={mobileNumber}
                    onChange={onChangeHandler}
                    maxLength={13}
                />
                <button onClick={onClickFindPwHandler}>비밀번호 찾기</button>
            </div>
            {isCodeSent && (
                <div>
                    <input
                        type="text"
                        placeholder="인증 코드 입력"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                </div>
            )}
            {isCodeSent && (
                <div>
                    <input
                        type="password"
                        placeholder="새로운 비밀번호 입력"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={onResetPasswordHandler}>비밀번호 변경</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}

export default FindPw;