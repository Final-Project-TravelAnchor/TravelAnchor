import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callGetMemberAPI, callGetPoint  } from '../../apis/MemberAPICalls';
import mypageCss from './MyPage.module.css'

const MyPage = () => {
    
    const { memberId } = useParams(); // 경로에서 memberId 가져오기
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const member = useSelector(state => state.memberReducer.member); // 회원 정보
    const point = useSelector(state => state.memberReducer.point);

    

    useEffect(() => {
        if (memberId) {
            dispatch(callGetMemberAPI({ memberId }));
            dispatch(callGetPoint({ memberId }));
        }
    }, [dispatch, memberId]);

    if (!member) {
        return <p>회원 정보를 불러오는 중입니다...</p>;
    }

    const handleUpdateClick = () => {
        navigate(`/MyPageUpdate/${memberId}`); // memberId를 경로에 포함
    };

   
    return (
        <div className={mypageCss.container}>
            {/* 헤더 섹션 */}
            <header className={mypageCss.header}>
                <h1>My Page</h1>
            </header>
            
            {/* 프로필 섹션 */}
            <section className={mypageCss.profileSection}>

                <div className={mypageCss.profileTop}>
                    {/* 프로필 사진 */}
                    <div className={mypageCss.profilePicture}>
                        <img 
                            src={
                                (member.profilePhoto 
                                    ? `http://localhost:8080/uploadedImages/${member.profilePhoto}` 
                                    : '/uploadedImages/default-avatar.png'
                                )} 
                            alt="프로필 사진" 
                        />
                    </div>
                        
                    {/* 프로필 기본 정보 */}
                    <div className={mypageCss.profileInfo}>
                        <h2>{member.memberNickName}님 환영합니다</h2>
                        <p className={mypageCss.username}>나의 아이디 {member.memberId}</p>
                        <p className={mypageCss.memberLevel}>나의 등급 [{member.memberLevel}]</p>
                    </div>
                </div>
                        
                {/* 상세 정보 - 하단 세분할 */}
                <div className={mypageCss.profileDetails}>
                    <div className={mypageCss.detailBox}>
                        <p><strong>휴대폰 번호:</strong></p>
                        <p>{member.memberMobileNumber}</p>
                    </div>
                    <div className={mypageCss.detailBox}>
                        <p><strong>가입 날짜:</strong></p>
                        <p>{member.memberCreatedAt}</p>
                    </div>
                    <div className={mypageCss.detailBox}>
                        <p><strong>매너 점수:</strong></p>
                        <p>
                            {point?.pointRewardTotalCount 
                                ? (point.pointRewardPoint / point.pointRewardTotalCount).toFixed(1) 
                                : '정보 없음'}
                        </p>
                    </div>
                </div>
                            
                {/* 정보 수정 버튼 */}
                <button className={mypageCss.button} onClick={handleUpdateClick}>
                    정보 수정하기
                </button>

            </section>
        </div>
    );
};

export default MyPage;
