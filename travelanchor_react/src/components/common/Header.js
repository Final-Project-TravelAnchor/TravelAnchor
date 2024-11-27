import { NavLink, useNavigate } from "react-router-dom";
import HeaderCSS from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { callLogoutAPI } from "../../apis/MemberAPICalls";
import { decodeJwt } from '../../utils/tokenUtils';
import LoginModal from "./LoginModal";
import commonCss from "./common.module.css";
import { callGetMemberAPI, callGetPoint  } from '../../apis/MemberAPICalls';
import { callTravelReportByMemberCodeAPI } from "../../apis/TravelReportAPICalls";


function Header({ hideAuthLinks }) {
	const navigate = useNavigate();

	// 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
	const dispatch = useDispatch();
	const loginMember = useSelector((state) => state.memberReducer); // 저장소에서 가져온 loginMember 정보
	const isLogin = window.localStorage.getItem('accessToken'); // Local Storage 에 token 정보 확인
	const [search, setSearch] = useState("");
	const [loginModal, setLoginModal] = useState(false);
	const member = useSelector(state => state.memberReducer.member); // 회원 정보
	const point = useSelector(state => state.memberReducer.point);
	const [isDropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태
	const [isHamburgerOpen, setHamburgerOpen] = useState(false);

	useEffect(() => {
        const token = window.localStorage.getItem('accessToken');
        if (token) {
            const decodedToken = decodeJwt(token);
            if (decodedToken.exp * 1000 > Date.now()) {
                dispatch(callGetMemberAPI({ memberId: decodedToken.sub }));
            } else {
                window.localStorage.removeItem('accessToken');
            }
        }
    }, [dispatch, isLogin]);

	const onSearchChangeHandler = (e) => {
		setSearch(e.target.value);
	};

	const memberCode = member ? member.memberCode : null;
	console.log("memberCode :" + memberCode);

	const onEnterkeyHandler = (e) => {
		if (e.key == "Enter") {
			console.log("Enter key", search);

			navigate(`/search?value=${search}`, { replace: false });

			// dispatch(callSearchProductAPI({
			//     search: search
			// }));
			window.location.reload();
		}
	};

	    // 로고 클릭시 메인 페이지로 이동
    const onClickLogoHandler = () => {
        navigate("/", { replace: true });
        // 회원 정보 다시 불러오기
        const token = window.localStorage.getItem('accessToken');
        if (token) {
            const decodedToken = decodeJwt(token);
            if (decodedToken.exp * 1000 > Date.now()) {
                dispatch(callGetMemberAPI({ memberId: decodedToken.sub }));
            }
        }
    };

	// 토큰이 만료되었을때 다시 로그인
	const onClickMypageHandler = () => {
		const token = JSON.parse(
			atob(window.localStorage.getItem("accessToken").split(".")[1])
		); // 토큰 디코딩
		console.log("[Header] onClickMypageHandler token : ", token);

		if (token.exp * 1000 < Date.now()) {
			setLoginModal(true);
			return;
		}

		window.location.href = `/mypage/${token.sub}`;
	};

	//로그아웃
	const onClickLogoutHandler = () => {
		window.localStorage.removeItem("accessToken");
		dispatch(callLogoutAPI());

		alert("로그아웃이 되어 메인화면으로 이동합니다.");
		navigate("/", { replace: true });
		// window.location.reload();
	};

	function BeforeLogin() {
		return (
			<div>
				<NavLink to="/login">로그인</NavLink> |{" "}
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
					<NavLink to={`/MyPage/${member?.memberId}`}>
						{member?.memberNickName || '회원'}님의 마이페이지
					</NavLink>
				</button>{" "}
				|{" "}
				<button
					className={HeaderCSS.HeaderBtn}
					onClick={onClickLogoutHandler}
				>
					로그아웃
				</button>
			</div>
		);
	}

 const plansClick = () => {
	navigate(`/plans/TravelPlan`); 
};

const favoriteClick = () => {
	navigate(`/Restaurants`); 
};

const reportClick = () => {
    navigate(`/travelreport/member/${memberCode}`);
	return memberCode;
};

	
// 드롭다운 열림/닫힘 상태 제어
const toggleDropdown = () => {
	setDropdownOpen((prev) => !prev);
};

const toggleHamburgerDropdown = () => {
	setHamburgerOpen((prev) => !prev);
};

return (
		<>
			<div className={HeaderCSS.HeaderWrap}>
				{loginModal ? (
					<LoginModal setLoginModal={setLoginModal} />
				) : null}
				<div>
					<a
						href=""
						className={HeaderCSS.logo}
						onClick={onClickLogoHandler}
					>
						<img src="/images/main/logo.png" />
					</a>
				</div>

				{/* navbar */}
				<div>
					<ul className={HeaderCSS.navMenu}>
						<li className={HeaderCSS.navItem}>
							<a href="#" onClick={toggleDropdown}>
								여행
							</a>
							{isDropdownOpen && (
								<ul className={HeaderCSS.dropdownMenu}>
									<li>
										<NavLink to="TravelDestinations">
											여행지
										</NavLink>
									</li>
									<li>
										<NavLink to="Restaurants">맛집</NavLink>
									</li>
									<li>
										<NavLink to="/Flight">항공권</NavLink>
									</li>
									<li>
										<NavLink to="/Accommodation">
											숙박
										</NavLink>
									</li>
								</ul>
							)}
						</li>
						<li className={HeaderCSS.navItem}>
							<NavLink to="/plans/TravelPlan">일정</NavLink>
						</li>
						<li className={HeaderCSS.navItem}>
							<NavLink to="/plans/ExpenseList">비용</NavLink>
						</li>
						<li className={HeaderCSS.navItem}>
							<NavLink to="/items/population">메이트</NavLink>
						</li>
						<li className={HeaderCSS.navItem}>
							<NavLink to="/travelReport">후기</NavLink>
						</li>
						<li className={HeaderCSS.navItem}>
							<NavLink to="freeboard">자유게시판</NavLink>
						</li>
						<li className={HeaderCSS.navItem}>
							<NavLink to="Notice">공지사항</NavLink>
						</li>
						<li className={HeaderCSS.navItem}>
							<NavLink to="ExchangeRate">환율</NavLink>
						</li>
						<li className={HeaderCSS.navItem}>
							<NavLink to="Weather">날씨</NavLink>
						</li>
						<li className={HeaderCSS.navItem}>
							<NavLink to="Translation">번역</NavLink>
						</li>
					</ul>
				</div>

				<div className={HeaderCSS.headerRight}>
					<div className={HeaderCSS.logWrap}>
						{!isLogin ? (
							!hideAuthLinks ? (
								<BeforeLogin />
							) : null // hideAuthLinks가 true일 때는 렌더링하지 않음
						) : (
							<AfterLogin />
						)}
					</div>

					{/* 햄버거 버튼 */}
					<div>
					    <button
					        type="button"
					        className={HeaderCSS.hamburgerBtn}
					        onClick={() => setHamburgerOpen(!isHamburgerOpen)}
					    >
					        <img src="/images/main/BtnHamberger.png" alt="hamburger" />
					    </button>
					    {isHamburgerOpen && (
					        <div 
					            className={HeaderCSS.hamburgerDropdown}  
					            onMouseLeave={() => setHamburgerOpen(false)}
					        >
					            {member ? (
					                // 로그인 상태일 때
					                <div className={HeaderCSS.profileSection}>
					                    <img 
					                        src={
					                            member.profilePhoto 
					                                ? `http://localhost:8080/uploadedImages/${member.profilePhoto}` 
					                                : '/images/main/default-avatar.png'
					                        } 
					                        className={HeaderCSS.profilePhoto}
					                    />
					                    <h2>안녕하세요!
					                        <br/>
					                        {member.memberNickName}님
					                    </h2>
					                    <p>
					                        나의 매너점수: 
					                        {point?.pointRewardTotalCount 
					                            ? (point.pointRewardPoint / point.pointRewardTotalCount).toFixed(1) 
					                            : '점수 정보를 불러오지 못했습니다.'}
					                    </p>
					                    <button onClick={plansClick}>나의 여행 일정</button>
					                    <button onClick={favoriteClick}>나의 저장 장소</button>
					                    <button onClick={reportClick}>나의 후기</button>
					                </div>
					            ) : (
					                // 비로그인 상태일 때
					                <div className={HeaderCSS.profileSection}>
					                    <p>로그인 후 이용 가능한 메뉴입니다.</p>
					                </div>
					            )}
					        </div>
					    )}
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
