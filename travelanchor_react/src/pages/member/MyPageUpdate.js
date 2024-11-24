import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callUpdateMemberAPI } from '../../apis/MemberAPICalls';
import updatePageCss from './MyPageUpdate.module.css';

const MyPageUpdate = () => {
    const { memberId } = useParams(); // URL에서 memberId 가져오기
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const member = useSelector(state => state.memberReducer);
    const [nickname, setNickname] = useState(member?.memberNickName || '');

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleSubmit = () => {
        if (!nickname.trim()) {
            alert('닉네임을 입력해주세요.');
            return;
        }

        // 수정 API 호출
        const updatedData = { memberNickName: nickname };

        dispatch(callUpdateMemberAPI({ 
            memberId, 
            updatedData
        }));

        alert('닉네임이 성공적으로 수정되었습니다!');
        navigate(`/MyPage/${memberId}`); // MyPage로 이동
    };

    return (
        <div className={updatePageCss.container}>
            <header className={updatePageCss.header}>
                <h1>회원 정보 수정</h1>
            </header>

            <section className={updatePageCss.formSection}>
                <label htmlFor="nickname">닉네임</label>
                <input 
                    type="text" 
                    id="nickname" 
                    value={nickname} 
                    onChange={handleNicknameChange} 
                    className={updatePageCss.inputField}
                />
                <button onClick={handleSubmit} className={updatePageCss.submitBtn}>
                    저장하기
                </button>
            </section>
        </div>
    );
};

export default MyPageUpdate;
