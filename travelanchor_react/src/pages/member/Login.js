import LoginCSS from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { POST_REGISTER } from "../../modules/MemberModule";
import { callLoginAPI } from "../../apis/MemberAPICalls";
import GoogleLoginComponent from "./GoogleLogin";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loginMember = useSelector((state) => state.memberReducer);

	const [form, setForm] = useState({
		memberId: "",
		memberPassword: "",
	});

	useEffect(() => {
		if (loginMember.status === 200) {
			console.log("[Login] Login SUCCESS {}", loginMember);
			navigate("/", { replace: true });
		}

		if (loginMember.status === 201) {
			loginMember.status = 100;
			dispatch({ type: POST_REGISTER, payload: loginMember });
		}
	}, [loginMember]);

	if (loginMember.length > 0) {
		console.log("[Login] Login is already authenticated by the server");
		return <Navigate to="/" />;
	}

	const onChangeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const onClickRegisterHandler = () => {
		navigate("/register", { replace: true });
	};

	const onClickFindIdHandler = () => {
		navigate("/findid", { replace: true });
	};

	const onClickFindPwHandler = () => {
		navigate("/findpw", { replace: true });
	};

	const onClickLoginHandler = () => {
		dispatch(
			callLoginAPI({
				form: form,
			})
		);
	};

	const onKeyPressHandler = (e) => {
		if (e.key === "Enter") {
			onClickLoginHandler();
		}
	};

	return (
		<div className={LoginCSS.backgroundDiv}>
			<div className={LoginCSS.overlay}></div>
			<div className={LoginCSS.loginDiv}>
            <img src="/images/main/logo.png" alt="Logo" className={LoginCSS.logo} />
                    <input
                        type="text"
                        name="memberId"
                        placeholder="아이디"
                        autoComplete="off"
                        onChange={onChangeHandler}
                    />
                    <input
                        type="password"
                        name="memberPassword"
                        placeholder="패스워드"
                        autoComplete="off"
                        onChange={onChangeHandler}
                        onKeyDown={onKeyPressHandler}
                    />
                    <button onClick={onClickLoginHandler}>로그인</button>
                    <GoogleLoginComponent />
                    <div className={LoginCSS.links}>
                        <button onClick={onClickFindIdHandler}>아이디찾기</button>
                        <button onClick={onClickFindPwHandler}>비밀번호찾기</button>
                        <button onClick={onClickRegisterHandler}>회원가입</button>
                    </div>
			</div>
		</div>
	);
}

export default Login;
