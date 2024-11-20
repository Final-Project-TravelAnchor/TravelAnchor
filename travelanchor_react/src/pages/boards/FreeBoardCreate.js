import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, replace, useNavigate, useParams } from "react-router-dom";
import { callCreateFreeBoardAPI } from "../../apis/FreeBoardAPICalls";


export default function PopulationCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0];
    // console.log(today);

    const [ form, setForm ] = useState({
        freeBoardCode: null,
        freeBoardCategoryCode: 1,  // 이건 카테고리 코드 가져와야 함
        freeBoardTitle: "Title", 
        freeBoardContent: "Content",
        freeBoardCreatedAt: today,
        memberCode: 1,
        freeBoardIsdeleted: "N",
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
        <div>
            <h1>FreeBoardCreate page</h1>
            <label>자유게시판 제목 : <input
                type="text"
                name="freeBoardTitle"
                placeholder="자유게시판 제목"
                onChange={onChangeHandler}
            /></label>
            <br/>
            <label>자유게시판 설명 : <input
                type="text"
                name="freeBoardContent"
                placeholder="공고 설명"
                onChange={onChangeHandler}
            /></label>
            <br/>
            <button onClick={onClickCreateFreeBoardHandler}>추가하기</button>
            <button onClick={onClickCancelFreeBoardHandler}>취소하기</button>
        </div>
    );
}