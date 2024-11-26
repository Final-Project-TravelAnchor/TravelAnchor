import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callFindPwAPI, callResetPwAPI } from "../../apis/MemberAPICalls";
import FindPwCSS from "./FindPw.module.css";

function FindPw() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [mobileNumber, setMobileNumber] = useState("");
	const [message, setMessage] = useState("");
	const [verificationCode, setVerificationCode] = useState("");
	const [isCodeSent, setIsCodeSent] = useState(false);
	const [newPassword, setNewPassword] = useState("");

    const mobileInputRef = useRef(null);

    useEffect(() => {
        if (message) {
            mobileInputRef.current.focus();
        }
    }, [message]);

	const onChangeHandler = (e) => {
		const value = e.target.value;
		const formattedValue = value
			.replace(/[^0-9]/g, "")
			.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3");

		if (formattedValue.length <= 13) {
			setMobileNumber(formattedValue);
		}
	};

	const onClickFindPwHandler = async () => {
		try {
			const verificationCode = await dispatch(
				callFindPwAPI({ mobileNumber })
			);
			setMessage(`비밀번호 찾기 성공 : 코드 ${verificationCode}`);
			setIsCodeSent(true);
            mobileInputRef.current.focus();
		} catch (error) {
			setMessage(error.message);
		}
	};

	const onResetPasswordHandler = async () => {
		if (!newPassword) {
			setMessage("새로운 비밀번호를 입력해주세요.");
			return;
		}

		try {
			await dispatch(
				callResetPwAPI({ mobileNumber, verificationCode, newPassword })
			);
			alert("비밀번호 변경이 완료되었습니다.");
			navigate("/login");
		} catch (error) {
			setMessage(error.message);
		}
	};

    const onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            onClickFindPwHandler();
        }
    };

	return (
		<div className={FindPwCSS.FindPwbackgroundDiv}>
			<div className={FindPwCSS.overlay}></div>
			<div className={FindPwCSS.FindPwContainer}>
            <h2 className={FindPwCSS.findPwTitle}>비밀번호 찾기</h2>
            <p>가입 시 등록한 휴대폰 번호를 입력하고<br />
                비밀번호 재설정을 해주세요.
            </p>
            <img src="/images/main/lock.png" alt="lock" className={FindPwCSS.lockImage} />
				<input
					type="text"
					placeholder="휴대전화 번호"
					value={mobileNumber}
					onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
					maxLength={13}
                    ref={mobileInputRef}
				/>
				<button
					className={FindPwCSS.findPwButton}
					onClick={onClickFindPwHandler}
				>
					비밀번호 찾기
				</button>
                {message && <p className={FindPwCSS.errorMessage}>{message}</p>}
				{isCodeSent && (
					<div>
						<input
							type="text"
							placeholder="인증 코드 입력"
							value={verificationCode}
							onChange={(e) =>
								setVerificationCode(e.target.value)
							}
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
						<button className={FindPwCSS.findPwButton} onClick={onResetPasswordHandler}>
							비밀번호 변경
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default FindPw;
