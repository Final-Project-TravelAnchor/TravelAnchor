import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callGetMemberAPI, callGetPoint  } from '../../apis/MemberAPICalls';
import mypageCss from './MyPage.module.css'

const MyPage = () => {
    
    const { memberId } = useParams(); // 경로에서 memberId 가져오기
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const member = useSelector(state => state.memberReducer);
    const point = useSelector(state => state.memberReducer); // 회원 점수

    

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
            <div className={mypageCss.profilePicture}>
            <img 
                src={
                    member.profilePhoto 
                        ? `http://localhost:8080/uploadedImages/${member.profilePhoto}` 
                        : '/images/main/default-avatar.png'
                } 
                alt="프로필 사진" 
            />

            </div>
                <h2>안녕하세요!
				    <br/>
				    {member.memberNickName}님</h2>
                <p>이름:{member.memberName}</p>
                <p>번호:{member.memberMobileNumber}</p>
                <p>회원등급:{member.memberLevel}</p>
                <p>가입날짜:{member.memberCreatedAt}</p>
                <p>나의 매너점수: {point.pointRewardPoint}</p>

                <button className={mypageCss.button} onClick={handleUpdateClick}>정보수정하기</button>
            </section>

           

            {/* 버튼 섹션
            <section className={mypageCss.navigationButtons}>
                <button className={mypageCss.navBtn}>내 정보</button>
                <button className={mypageCss.navBtn}>나의 여행 일정</button>
                <button className={mypageCss.navBtn}>나의 저장 장소</button>
                <button className={mypageCss.navBtn}>나의 후기</button>
            </section> */}
        </div>
    );
};

export default MyPage;
