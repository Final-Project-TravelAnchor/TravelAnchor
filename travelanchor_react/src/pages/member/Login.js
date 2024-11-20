import LoginCSS from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { POST_REGISTER } from '../../modules/MemberModule';
import {
    callLoginAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';
import KakaoLoginImage from '../../assets/kakao_login.png';

function Login() {
        
    const navigate = useNavigate();

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    /* 폼 데이터 한번에 변경 및 State에 저장 */   
    const [form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });

    useEffect(() => {
         // 카카오 SDK를 동적으로 로드하고 초기화
        const loadKakaoSDK = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
                script.onload = () => {
                    // SDK 로드 후 초기화
                    window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
                    console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
                    resolve();
                };
                document.body.appendChild(script);
            });
        };

        loadKakaoSDK();

        if(loginMember.status === 200){
            console.log("[Login] Login SUCCESS {}", loginMember);
            navigate("/", { replace: true });
        }

        /* 회원 가입 후 로그인 페이지로 안내 되었을 때 */
        if(loginMember.status === 201){

            loginMember.status = 100  // Continue
            dispatch({ type: POST_REGISTER,  payload: loginMember });
        }  
    }
    ,[loginMember]);
    
    /* 로그인 상태일 시 로그인페이지로 접근 방지 */
    if(loginMember.length > 0) {
        console.log("[Login] Login is already authenticated by the server");        
        return <Navigate to="/"/>
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickRegisterHandler = () => { 
        navigate("/register", { replace: true })
    }

    const onClickFindIdHandler = () => {
        navigate("/findid", { replace: true });
    }


    /* 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동 */
    const onClickLoginHandler = () => { 
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));
    }
/* 카카오 로그인 버튼 클릭 시 */
const onClickKakaoLoginHandler = () => {
    if (!window.Kakao.isInitialized()) {
        console.error('Kakao SDK가 초기화되지 않았습니다.');
        return;
    }

    window.Kakao.Auth.login({
        success: function (authObj) {
            console.log('카카오 로그인 성공', authObj);
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: function (response) {
                    console.log('카카오 사용자 정보', response);
                    
                    // 카카오 로그인 성공 시 리덕스 상태 업데이트
                    const kakaoUserInfo = {
                        status: 200,
                        data: {
                            memberId: response.id,
                            memberName: response.properties?.nickname,
                            memberEmail: response.kakao_account?.email,
                            memberType: 'KAKAO'
                        }
                    };

                     // accessToken을 localStorage에 저장
                    window.localStorage.setItem('accessToken', authObj.access_token);

                    // 리덕스에 로그인 상태 저장
                    dispatch({ type: POST_LOGIN, payload: kakaoUserInfo });
                    
                    // 메인 페이지로 이동
                    navigate("/", { replace: true });
                    window.location.reload(); // 헤더 상태 업데이트를 위한 새로고침
                },
                fail: function (error) {
                    console.error('카카오 사용자 정보 요청 실패', error);
                },
            });
        },
        fail: function (err) {
            console.error('카카오 로그인 실패', err);
        },
    });
};

    return (
        <div className={ LoginCSS.backgroundDiv}>
            <div className={ LoginCSS.loginDiv }>
                <h1>로그인</h1>
                <input 
                    type="text" 
                    name='memberId'
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="password"
                    name='memberPassword' 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button
                    onClick={ onClickLoginHandler }
                >
                    로그인
                </button>
                <button
                    style={{ border: 'none', margin: 0, fontSize: '10px', height: '10px' }}
                    onClick={onClickFindIdHandler}
                >
                    아이디 찾기
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick={ onClickRegisterHandler }
                >
                    회원가입
                </button>
                <img 
                    src={KakaoLoginImage} 
                    alt="카카오 로그인"
                    style={{ cursor: 'pointer', marginTop: '10px' }}
                    onClick={ onClickKakaoLoginHandler }
                />
            </div>
        </div>
    );
}

export default Login;