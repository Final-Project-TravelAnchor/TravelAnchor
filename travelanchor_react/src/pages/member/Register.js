import RegisterCSS from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { callRegisterAPI } from "../../apis/MemberAPICalls";
import { POST_LOGIN } from "../../modules/MemberModule";

function Register() {
	const navigate = useNavigate();

	/* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
	const dispatch = useDispatch();
	const member = useSelector((state) => state.memberReducer); // API 요청하여 가져온 loginMember 정보
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const [form, setForm] = useState({
		memberId: "",
		memberPassword: "",
		confirmMemberPassword: "",
		memberName: "",
		memberMobileNumber: "",
		memberNickName: "",
		memberBirthDate: "",
		memberGender: "",
		memberAddress: "",
	});

	useEffect(() => {
		if (member.status === 201) {
			console.log("[Login] Register SUCCESS {}", member);
			alert("가입을 환영합니다!");
			setSuccessMessage("가입을 환영합니다!");
			setTimeout(() => {
				navigate("/login", { replace: true });
			}, 2000);
		}
	}, [member]);

	const formatPhoneNumber = (value) => {
		// 숫자만 남기기
		const phoneNumber = value.replace(/[^\d]/g, "");

		// 전화번호 길이에 따라 적절히 포맷
		if (phoneNumber.length <= 3) {
			return phoneNumber; // 3자리 이하일 때는 그대로 반환
		} else if (phoneNumber.length <= 6) {
			return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`; // 4~6자리일 때
		} else if (phoneNumber.length <= 10) {
			return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
				3,
				6
			)}-${phoneNumber.slice(6)}`; // 7~10자리일 때
		} else {
			return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
				3,
				7
			)}-${phoneNumber.slice(7, 11)}`; // 11자리 이상일 때
		}
	};

	const onChangeHandler = (e) => {
		const { name, value } = e.target;

		if (name === "memberMobileNumber") {
			const formattedValue = formatPhoneNumber(value);
			setForm({
				...form,
				[name]: formattedValue, // 포맷팅된 값으로 상태 업데이트
			});
		} else {
			setForm({
				...form,
				[name]: value,
			});
		}
	};

	// 비밀번호 확인 체크
	const onClickBackHandler = () => {
		/* 돌아가기 클릭시 메인 페이지로 이동 */
		navigate("/", { replace: true });
	};

	useEffect(() => {
		if (form.confirmMemberPassword) {
			// confirmMemberPassword가 비어있지 않을 때만 체크
			if (form.memberPassword !== form.confirmMemberPassword) {
				setErrorMessage("비밀번호가 일치하지 않습니다."); // 비밀번호 불일치 메시지
			} else {
				setErrorMessage("비밀번호가 일치합니다."); // 비밀번호 일치 메시지
			}
		} else {
			setErrorMessage(""); // confirmMemberPassword가 비어있을 경우 에러 메시지 초기화
		}
	}, [form.confirmMemberPassword, form.memberPassword]);

	const onClickRegisterHandler = async () => {
		// 유효성 검사
		if (!form.memberId) {
			setErrorMessage("아이디를 입력하세요.");
			return;
		}

		if (!form.memberId) {
			setErrorMessage("아이디를 입력하세요.");
			document.getElementById("memberId").focus();
			return;
		}
		if (!form.memberPassword) {
			setErrorMessage("패스워드를 입력하세요.");
			document.getElementById("memberPassword").focus();
			return;
		}
		if (form.memberPassword !== form.confirmMemberPassword) {
			setErrorMessage("패스워드가 일치하지 않습니다.");
			document.getElementById("confirmMemberPassword").focus();
			return;
		}
		if (!form.memberName) {
			setErrorMessage("이름을 입력하세요.");
			document.getElementById("memberName").focus();
			return;
		}
		if (!form.memberMobileNumber) {
			setErrorMessage("휴대전화 번호를 입력하세요.");
			document.getElementById("memberMobileNumber").focus();
			return;
		}
		if (!form.memberNickName) {
			setErrorMessage("닉네임을 입력하세요.");
			document.getElementById("memberNickName").focus();
			return;
		}
		if (!form.memberBirthDate) {
			setErrorMessage("생년월일을 입력하세요.");
			document.getElementById("memberBirthDate").focus();
			return;
		}
		if (!form.memberGender) {
			setErrorMessage("성별을 선택하세요.");
			document.getElementById("memberGender").focus();
			return;
		}
		if (!form.memberAddress) {
			setErrorMessage("주소를 입력하세요.");
			document.getElementById("memberAddress").focus();
			return;
		}

		setErrorMessage(""); // 에러 메시지 초기화

		// 모든 유효성 검사를 통과한 경우 API 호출
		dispatch(callRegisterAPI({ form: form }));
	};

	// 카카오 주소 API를 실행하는 함수
	const onClickAddressHandler = () => {
		new window.daum.Postcode({
			oncomplete: (data) => {
				setForm({ ...form, memberAddress: data.address });
			},
		}).open();
	};

	return (
		<div className={RegisterCSS.backgroundDiv}>
			<div className={RegisterCSS.mainContainer}>
				<h1 className={RegisterCSS.title}>회원가입</h1>
				<div className={RegisterCSS.registerDiv}>
					{errorMessage && (
						<p className={RegisterCSS.errorMessage}>
							{errorMessage}
						</p>
					)}
					<div className={RegisterCSS.inputContainer}>
						<label htmlFor="memberId">아이디</label>
						<input
							type="text"
							name="memberId"
							id="memberId"
							placeholder="아이디"
							autoComplete="off"
							onChange={onChangeHandler}
						/>
					</div>
					<div className={RegisterCSS.inputContainer}>
						<label htmlFor="memberPassword">패스워드</label>
						<input
							type="password"
							name="memberPassword"
							id="memberPassword"
							placeholder="패스워드"
							autoComplete="off"
							onChange={onChangeHandler}
						/>
					</div>
					<div className={RegisterCSS.inputContainer}>
						<label htmlFor="confirmMemberPassword">
							패스워드 확인
						</label>
						<input
							type="password"
							name="confirmMemberPassword"
							id="confirmMemberPassword"
							placeholder="패스워드 확인"
							autoComplete="off"
							onChange={onChangeHandler}
						/>
					</div>
					<div className={RegisterCSS.inputContainer}>
						<label htmlFor="memberName">이름</label>
						<input
							type="text"
							name="memberName"
							id="memberName"
							placeholder="이름"
							autoComplete="off"
							onChange={onChangeHandler}
						/>
					</div>
					<div className={RegisterCSS.inputContainer}>
						<label htmlFor="memberMobileNumber">휴대전화</label>
						<input
							type="tel"
							name="memberMobileNumber"
							id="memberMobileNumber"
							placeholder="휴대폰 번호"
							autoComplete="off"
							value={form.memberMobileNumber}
							pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
							onChange={onChangeHandler}
						/>
					</div>
					<div className={RegisterCSS.inputContainer}>
						<label htmlFor="memberNickName">닉네임</label>
						<input
							type="text"
							name="memberNickName"
							id="memberNickName"
							placeholder="닉네임"
							autoComplete="off"
							onChange={onChangeHandler}
						/>
					</div>
					<div className={RegisterCSS.inputContainer}>
						<label htmlFor="memberBirthDate">생년월일</label>
						<input
							type="date"
							name="memberBirthDate"
							id="memberBirthDate"
							placeholder="생년월일"
							autoComplete="off"
							onChange={onChangeHandler}
						/>
					</div>
					<div className={RegisterCSS.inputContainer}>
						<label htmlFor="memberGender">성별</label>
						<div className={RegisterCSS.radioContainer}>
							<label>
								<input
									type="radio"
									name="memberGender"
									value="남"
									checked={form.memberGender === "남"}
									onChange={onChangeHandler}
								/>
								남
							</label>
							<label>
								<input
									type="radio"
									name="memberGender"
									value="여"
									checked={form.memberGender === "여"}
									onChange={onChangeHandler}
								/>
								여
							</label>
						</div>
					</div>
					<div className={RegisterCSS.inputContainer}>
						<label htmlFor="memberAddress">주소</label>
						<input
							type="text"
							name="memberAddress"
							id="memberAddress"
							placeholder="주소"
							autoComplete="off"
							value={form.memberAddress}
							onChange={onChangeHandler}
							readOnly
						/>
						<button
							className={RegisterCSS.registerButton}
							onClick={onClickAddressHandler}
						>
							주소 검색
						</button>
						<button
							className={RegisterCSS.backButton}
							onClick={onClickBackHandler}
						>
							돌아가기
						</button>
						<button
							className={RegisterCSS.registerButton}
							onClick={onClickRegisterHandler}
						>
							가입하기
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
