import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callUpdateMemberAPI } from '../../apis/MemberAPICalls';
import updatePageCss from './MyPageUpdate.module.css';

const MyPageUpdate = () => {
    const { memberId } = useParams(); // URL에서 memberId 가져오기
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const member = useSelector(state => state.memberReducer);

    // 상태 변수들 정의
    const [image, setImage] = useState(null); // 프로필 사진 상태
    const [imageUrl, setImageUrl] = useState(null);
    const [imagePreview, setImagePreview] = useState(member?.profilePhoto || '/images/main/default-avatar.png');
    const [modifyMode, setModifyMode] = useState(false); // 수정모드 상태
    const [form, setForm] = useState({
        memberNickName: member?.memberNickName || '',
    });

    const imageInput = useRef();

    useEffect(() => {
        if (image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                setImagePreview(e.target.result); // 미리보기 업데이트
            };
            fileReader.readAsDataURL(image);
        }
    }, [image]);
    
    useEffect(() => {
        if (member) {
            setForm({
                memberNickName: member.memberNickName || '',
            });
            setImagePreview(member?.profilePhoto || '/images/main/default-avatar.png');
        }
    }, [member]);

    const onChangeImageUpload = (e) => {
        console.log(e.target.files[0]); // 업로드된 파일 확인

        setImage(e.target.files[0]);
    };

    const onClickImageUpload = () => {
        if (modifyMode) {
            imageInput.current.click();
        }
    };

   

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const onClickUserUpdateHandler = () => {
        if (!form.memberNickName.trim()) {
            alert('닉네임을 입력해주세요.');
            return;
        }
    
        const formData = new FormData();
        const memberData = { memberNickName: form.memberNickName };
    
        formData.append(
            'memberDTO',
            new Blob([JSON.stringify(memberData)], {
                type: 'application/json',
            })
        );
    
        if (image) {
            formData.append('profilePhoto', image);
        }

        console.log([...formData.entries()]);
    
        dispatch(
            callUpdateMemberAPI({
                memberId,
                updatedData: formData,
            })
        );
    
        alert('정보가 성공적으로 수정되었습니다.');
        navigate(`/MyPage/${memberId}`, { replace: true });
    };



    return (
        <div className={updatePageCss.container}>
        <div className={updatePageCss.submitBtnContainer}>
            <button className={updatePageCss.backButton} onClick={() => navigate(-1)}>
                돌아가기
            </button>
            {modifyMode && (
                <button className={updatePageCss.saveButton} onClick={onClickUserUpdateHandler}>
                    정보 수정 저장하기
                </button>
            )}
            {!modifyMode && (
                <button className={updatePageCss.modifyButton} onClick={() => setModifyMode(true)}>
                    수정모드
                </button>
            )}
        </div>

        <header className={updatePageCss.header}>
            <h1>회원 정보 수정</h1>
        </header>

        <section className={updatePageCss.formSection}>
            {/* 프로필 사진 수정 */}
            <label htmlFor="profileImage">프로필 사진</label>
            <button
                className={updatePageCss.productImageButton}
                onClick={onClickImageUpload}
                style={!modifyMode ? { backgroundColor: 'gray' } : null}
            >
                이미지 업로드
            </button>
            {imagePreview && (
                <div className={updatePageCss.imagePreview}>
                    <img
                        className={updatePageCss.productImage}
                        src={imagePreview}
                        alt="preview"
                    />
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        name="profileImage"
                        accept="image/jpg,image/png,image/jpeg,image/gif"
                        onChange={onChangeImageUpload}
                        ref={imageInput}
                    />
                </div>
            )}

            {/* 닉네임 수정 */}
            <label htmlFor="nickname">닉네임</label>
            <input
                type="text"
                id="nickname"
                name="memberNickName"
                value={form.memberNickName}
                onChange={onChangeHandler}
                className={updatePageCss.inputField}
                disabled={!modifyMode}
            />
        </section>
    </div>
    );
};

export default MyPageUpdate;
