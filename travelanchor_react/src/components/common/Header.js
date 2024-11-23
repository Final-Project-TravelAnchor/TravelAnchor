import { NavLink, useNavigate } from 'react-router-dom';
import HeaderCSS from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { callLogoutAPI } from '../../apis/MemberAPICalls';
import LoginModal from './LoginModal';
import commonCss from './common.module.css';

function Header({ hideAuthLinks }) {
	const navigate = useNavigate();

	// 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
	const dispatch = useDispatch();
   	const loginMember = useSelector((state) => state.memberReducer); // 저장소에서 가져온 loginMember 정보
   	const isLogin = loginMember.data ? true : false; // Redux 상태에 따라 로그인 여부 확인
   
	
	const [search, setSearch] = useState('');
	const [loginModal, setLoginModal] = useState(false);
	
	const [isDropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태
	const [isHamburgerOpen, setHamburgerOpen] = useState(false);

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
		const token = JSON.parse(atob(window.localStorage.getItem('accessToken').split('.')[1])); // 토큰 디코딩
		console.log('[Header] onClickMypageHandler token : ', token);

		if (token.exp * 1000 < Date.now()) {
			setLoginModal(true);
			return;
		}

		window.location.href = `/mypage/${token.sub}`;
	};

	//로그아웃
	const onClickLogoutHandler = () => {
		window.localStorage.removeItem('accessToken');
		dispatch(callLogoutAPI());
  
		alert('로그아웃이 되어 메인화면으로 이동합니다.');
		navigate('/', { replace: true });
		window.location.reload();
	 };
  
	 // 카카오 로그아웃 핸들러 추가
	 const onClickKakaoLogoutHandler = () => {
		if (!window.Kakao.isInitialized()) {
		   console.error('Kakao SDK가 초기화되지 않았습니다.');
		   return;
		}
  
		window.Kakao.Auth.logout(() => {
		   console.log('카카오 로그아웃 성공');
		   window.localStorage.removeItem('kakaoAccessToken'); // 카카오 토큰 제거
		   dispatch(callLogoutAPI()); // Redux 상태 초기화
		   alert('카카오 로그아웃이 완료되었습니다.');
		   navigate('/', { replace: true }); // 메인 페이지로 이동
		   window.location.reload();
	  });
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
		  ><NavLink to="/MyPage/:memberId">
			 {loginMember.data?.memberType === 'KAKAO' 
				? `${loginMember.data?.memberName}님의 마이페이지` 
				: '마이페이지'}</NavLink>
		  </button>{' '}
		  |{' '}
		  <button
			 className={HeaderCSS.HeaderBtn}
			 onClick={onClickLogoutHandler}
		  >
			 로그아웃
		  </button>
		  <button
			  className={HeaderCSS.HeaderBtn}
			  onClick={onClickKakaoLogoutHandler} // 카카오 로그아웃
		  >
			  카카오 로그아웃
		  </button>
	   </div>
	);
 }

	

	// 드롭다운 열림/닫힘 상태 제어
	const toggleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};

	const toggleHamburgerDropdown = () => {
		setHamburgerOpen((prev) => !prev);
	};


	return (
		<>
			<div class="HeaderWrap" className={HeaderCSS.HeaderWrap}>

				{loginModal ? <LoginModal setLoginModal={setLoginModal} /> : null}
				<div>
					<a href='' class="logo" className={HeaderCSS.logo}
						// className={HeaderCSS.LogoBtn}
						onClick={onClickLogoHandler}
					>
						<img src='/images/main/logo.png'/>
					</a>
				</div>

				{/* navbar */}
				<div>
					<ul class="navMenu" className={HeaderCSS.navMenu}>
						{/* <li class="navItem" className={HeaderCSS.navItem}>
							<a href="#">여행</a>
							<ul class="dropdownMenu" className={HeaderCSS.dropdownMenu}>
								<li><a href="#">여행지</a></li>
								<li><NavLink to="Restaurants">맛집</NavLink></li>
								<li><NavLink to="Flight">항공권</NavLink></li>
								<li class="navItem"><NavLink to="/Accommodation">숙박</NavLink></li>
							</ul>
						</li> */}
						<li class="navItem" className={HeaderCSS.navItem} onMouseLeave={() => setDropdownOpen(false)}>
							<a href="#" onClick={toggleDropdown}>여행</a>
							{isDropdownOpen && (
							<ul className={HeaderCSS.dropdownMenu}>
								<li>
									<NavLink to="TravelDestinations">여행지</NavLink>
								</li>
								<li>
									<NavLink to="Restaurants">맛집</NavLink>
								</li>
								<li>
									<NavLink to="/Flight">항공권</NavLink>
								</li>
								<li>
									<NavLink to="/Accommodation">숙박</NavLink>
								</li>
							</ul>
						)}
						</li>
						<li class="navItem" className={HeaderCSS.navItem}><NavLink to="/plans/ExpenseList">일정</NavLink></li>
						<li class="navItem" className={HeaderCSS.navItem}><NavLink to="/items/population">메이트</NavLink></li>
						<li class="navItem" className={HeaderCSS.navItem}><NavLink to="/TravelReport">후기</NavLink></li>
						<li class="navItem" className={HeaderCSS.navItem}><NavLink to="freeboard">자유게시판</NavLink></li>
						<li class="navItem" className={HeaderCSS.navItem}><NavLink to="Notice">공지사항</NavLink></li>
						<li class="navItem" className={HeaderCSS.navItem}><NavLink to="ExchangeRate">환율</NavLink></li>
						<li class="navItem" className={HeaderCSS.navItem}><NavLink to="Weather">날씨</NavLink></li>
						<li class="navItem" className={HeaderCSS.navItem}><NavLink to="Translation">번역</NavLink></li>
					</ul>
				</div>

				<div class="headerRight" className={HeaderCSS.headerRight}>
               <div class="logWrap"> 
                  {/* {isLogin == null || isLogin === undefined ? (
                     !hideAuthLinks ? <BeforeLogin /> : null // hideAuthLinks가 true일 때는 렌더링하지 않음
                    ) : (
                        <AfterLogin />
                       )} */}
                  {!isLogin ? (
                     !hideAuthLinks ? <BeforeLogin /> : null // hideAuthLinks가 true일 때는 렌더링하지 않음
                    ) : (
                        <AfterLogin />
                    )}
               </div>

					{/* 햄버거 버튼 */}
					<div  >
						<button
							type="button"
							className={HeaderCSS.hamburgerBtn}
							onClick={() => setHamburgerOpen(!isHamburgerOpen)}
		
						>
							<img src="/images/main/BtnHamberger.png" alt="hamburger" />
						</button>
						{isHamburgerOpen && (
							<div className={HeaderCSS.hamburgerDropdown}  onMouseLeave={() => setHamburgerOpen(false)}>
								<button>나의 여행 일정</button>
								<button>나의 저장 장소</button>
								<button>나의 후기</button>
								<button>나의 매너 점수</button>
							</div>
						)}
					</div>

				</div>

			</div>
		</>
	);
}

export default Header;