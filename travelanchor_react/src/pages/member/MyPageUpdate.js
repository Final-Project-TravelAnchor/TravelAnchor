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
    const [imagePreview, setImagePreview] = useState('/images/main/default-avatar.png');
    const [form, setForm] = useState({ memberNickName: member?.memberNickName || ''});
    const imageInput = useRef();


    useEffect(() => {
        if (member) {
            setForm({
                memberNickName: member.memberNickName || '',
                memberAddress: member.memberAddress || '',
            });
            setImagePreview(member?.profilePhoto || '/images/main/default-avatar.png');
        }
    }, [member]);

    
    useEffect(() => {
        if (image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => setImagePreview(e.target.result); 
            fileReader.readAsDataURL(image);
        }
    }, [image]);
    

    const onChangeHandler = ({ target: { name, value } }) => {
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };
    
    

    const onChangeImageUpload = (e) => setImage(e.target.files[0]);
   

    const onClickImageUpload = () =>  imageInput.current.click();

    // 카카오 주소 API를 실행하는 함수
    const onClickAddressHandler = () => {
        new window.daum.Postcode({
          oncomplete: (data) => {
              setForm((prevForm) => ({
                  ...prevForm,
                  memberAddress: data.address, // 카카오 API로 받은 주소를 업데이트
              }));
          },
        }).open();
      };

   
    

    const onClickUserUpdateHandler = () => {
        if (!form.memberNickName.trim()) {
            alert('닉네임을 입력해주세요.');
            return;
        }
        
    
        const formData = new FormData();

        const memberData = { 
            memberNickName: form.memberNickName, 
            memberAddress: form.memberAddress || '' 
        };
    
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
    <header className={updatePageCss.header}>
        <h1>회원 정보 수정</h1>
    </header>

    <button className={updatePageCss.backButton} onClick={() => navigate(-1)}>
        돌아가기
    </button>

    <section className={updatePageCss.formSection}>
    {/* 프로필 사진 */}
    <div className={updatePageCss.inputGroup}>
        <div className={updatePageCss.inputGroupLabel}>
        <label>프로필 사진</label>
        </div>
        <div className={updatePageCss.centerInput}>
            <div className={updatePageCss.imagePreview}>
                <img
                    className={updatePageCss.productImage}
                    src={imagePreview}
                    alt="preview"
                />
            </div>
        </div>
        <button
            className={updatePageCss.rightButton}
            onClick={onClickImageUpload}
        >
            이미지 업로드
        </button>
        <input
            style={{ display: 'none' }}
            type="file"
            name="profileImage"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            onChange={onChangeImageUpload}
            ref={imageInput}
        />
    </div>

    {/* 닉네임 */}
    <div className={updatePageCss.inputGroup}>
        <div className={updatePageCss.inputGroupLabel}>
        <label>닉네임</label>
        </div>
        <div>
            <input
                type="text"
                id="nickname"
                placeholder="닉네임"
                name="memberNickName"
                value={form.memberNickName}
                onChange={onChangeHandler}
                className={updatePageCss.inputField}
            />
        </div>
        
    </div>

    {/* 주소 */}
    <div className={updatePageCss.inputGroup}>
        <div className={updatePageCss.inputGroupLabel}>
        <label>주소</label>
        </div>
        <div className={updatePageCss.centerInput}>
            <input
                type="text"
                name="memberAddress"
                id="memberAddress"
                placeholder="주소"
                autoComplete="off"
                value={form.memberAddress}
                onChange={onChangeHandler}
                className={updatePageCss.inputField}
            />
        </div>
        <button
            className={updatePageCss.rightButton}
            onClick={onClickAddressHandler}
        >
            검색
        </button>
    </div>
</section>


    <div className={updatePageCss.buttonSection}>
        <button
            className={updatePageCss.saveButton}
            onClick={onClickUserUpdateHandler}
        >
            정보 수정 저장하기
        </button>
    </div>
</div>

                
                        
    );  
};          
    
export default MyPageUpdate;
