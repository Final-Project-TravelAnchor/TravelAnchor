import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, replace, useNavigate, useParams } from "react-router-dom";
import { callCreateFreeBoardAPI } from "../../apis/FreeBoardAPICalls";
import { callGetMemberAPI } from "../../apis/MemberAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import './FreeBoardCreate.css';


export default function FreeBoardCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector(state => state.memberReducer);
    const userMembercode = userInfo.data;

    const today = new Date().toISOString().split('T')[0];
    // console.log(today);

    useEffect(() => {

        let tokenSub = decodeJwt(window.localStorage.getItem("accessToken"));

        dispatch(callGetMemberAPI({memberId: tokenSub.sub}));
    },[]);
    

    const [ form, setForm ] = useState({
        freeBoardCode: null,
        freeBoardCategoryCode: 1,  // 이건 카테고리 코드 가져와야 함
        freeBoardTitle: "Title", 
        freeBoardContent: "Content",
        freeBoardCreatedAt: today,
        // memberCode: userMembercode.memberCode,
        freeBoardIsdeleted: "N",
        memberCode: userInfo.memberCode,
    })

    const onClickCreateFreeBoardHandler = async () => {
        console.log("[FreeBoardCreate] onClickCreateFreeBoardClickCreate");

        // form 값으로 API 요청
        await dispatch(callCreateFreeBoardAPI(form));

        navigate(`/freeboard`);

    };

    const onClickCancelFreeBoardHandler = () => {
        console.log("[FreeBoardCreate] onClickCancelFreeBoardHandler");
        navigate(`/freeboard`);
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    return (
        <div className="fb-create-container">
            <h1 className="fb-create-title">자유게시판 작성</h1>
            <div className="fb-create-form">
            <label className="fb-create-label">제목</label>
                <input
                className="fb-create-title-input"
                type="text"
                name="freeBoardTitle"
                placeholder="제목을 입력해주세요!"
                onChange={onChangeHandler}
                />
            <br/>
            <label className="fb-create-label">내용</label>
                <textarea
                className="fb-create-content-textarea"
                type="text"
                name="freeBoardContent"
                placeholder="내용을 입력해주세요!"
                onChange={onChangeHandler}
                />
            <div className="fb-create-button-container">
                <button 
                className="fb-create-save-button"
                onClick={onClickCreateFreeBoardHandler}>추가하기</button>
                <button 
                className="fb-create-cancel-button"
                onClick={onClickCancelFreeBoardHandler}>취소하기</button>
            </div>
            </div>
        </div>
    );
}