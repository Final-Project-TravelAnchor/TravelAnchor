import { NavLink, useNavigate } from 'react-router-dom';
import HeaderCSS from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';


function Header() {
	const navigate = useNavigate();

	// 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
	const dispatch = useDispatch();
	const loginMember = useSelector((state) => state.memberReducer); // 저장소에서 가져온 loginMember 정보
	const isLogin = window.localStorage.getItem('accessToken'); // Local Storage 에 token 정보 확인
	const [search, setSearch] = useState('');

	const [loginModal, setLoginModal] = useState(false);

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	};

	const onEnterkeyHandler = (e) => {
		if (e.key == 'Enter') {
			console.log('Enter key', search);

			navigate(`/search?value=${search}`, { replace: false });

			// dispatch(callSearchProductAPI({
			//     search: search
			// }));
			window.location.reload();
		}
	};

	// 로고 클릭시 메인 페이지로 이동
	const onClickLogoHandler = () => {
		navigate('/', { replace: true });
	};

	// 토큰이 만료되었을때 다시 로그인
	const onClickMypageHandler = () => {
		// const token = decodeJwt(window.localStorage.getItem('accessToken'));
		// console.log('[Header] onClickMypageHandler token : ', token);

		// if (token.exp * 1000 < Date.now()) {
		// 	setLoginModal(true);
		// 	return;
		// }

		// navigate('/mypage', { replace: true });
	};

	//로그아웃
	const onClickLogoutHandler = () => {
		// window.localStorage.removeItem('accessToken');
		// dispatch(callLogoutAPI());

		// alert('로그아웃이 되어 메인화면으로 이동합니다.');
		// navigate('/', { replace: true });
		// window.location.reload();
	};

	function BeforeLogin() {
		return (
			<div>
				<NavLink to="/login">로그인</NavLink> |{' '}
				<NavLink to="/register">회원가입</NavLink>
			</div>
		);
	}

	function AfterLogin() {
		return (
			<div>
				<button
					className={HeaderCSS.HeaderBtn}
					onClick={onClickMypageHandler}
				>
					마이페이지
				</button>{' '}
				|{' '}
				<button
					className={HeaderCSS.HeaderBtn}
					onClick={onClickLogoutHandler}
				>
					로그아웃
				</button>
			</div>
		);
	}

	return (
		<>
			{/* {loginModal ? <LoginModal setLoginModal={setLoginModal} /> : null} */}
			<div>
				<button
					// className={HeaderCSS.LogoBtn}
					onClick={onClickLogoHandler}
				>
					Main
				</button>
			</div>
			<div>
				<ul class="nav-menu">
					<li class="nav-item">
						<a href="#">여행</a>
						<ul class="dropdown-menu">
							<li><a href="#">여행지</a></li>
							<li><a href="#">항공권</a></li>
							<li><a href="#">숙박</a></li>
						</ul>
					</li>
					<li class="nav-item"><a href="#">일정</a></li>
					<li class="nav-item"><a href="#">메이트</a></li>
					<li class="nav-item"><a href="#">후기</a></li>
					<li class="nav-item"><a href="#">자유게시판</a></li>
					<li class="nav-item"><a href="#">공지사항</a></li>
					<li>
						{/* 로그인 상태에 따라 다른 컴포넌트 랜더링 */}
						{isLogin == null || isLogin === undefined ? (
							<BeforeLogin />
						) : (
							<AfterLogin />
						)}
					</li>
				</ul>
			</div>
		</>
	);
}

export default Header;