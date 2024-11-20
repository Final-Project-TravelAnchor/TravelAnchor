import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callUpdateFreeBoardAPI } from "../../apis/FreeBoardAPICalls";
import { useDispatch } from "react-redux";


export default function FreeBoardModify() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log(location.state);
    const { freeboard } = location.state || {};
    console.log("[FreeBoardModify] freeboard: " + freeboard);

    const [ form, setForm ] = useState({});

    const onChangeHanlder = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        // console.log(e.target.name + " : " + e.target.value);
    };

    // 저장
    const onClickSaveHandler = async (e) => {
        const updatedFreeBoard = {
            ...freeboard,
            freeBoardCode: 1,
            freeBoardCategoryCode: 1,
            freeBoardTitle: form.freeboardTitle,
            freeBoardContent: form.freeboardContent,
            freeBoardCreatedAt: "2023-12-31",
            // freeBoardCreatedAt: "2023-12-31T15:00:00.000+00:00",
            memberCode: 1,
            freeBoardIsdeleted: 'N',
            // freeBoardCode: 1,
            // freeBoardCategoryCode: 1,
            // freeBoardTitle: "to the Travel Community",
            // freeBoardContent: "",
            // freeBoardCreatedAt: "2023-12-31T15:00:00.000+00:00",
            // memberCode: 1,
            // freeBoardIsdeleted: "N"
        };

        console.log("updatedFreeboard : ", updatedFreeBoard);

        dispatch(callUpdateFreeBoardAPI(updatedFreeBoard));
        navigate(`/freeboard`, { replace: false});
    };

    // 취소
    const onClickCancelHandler = () => {
        console.log("[FreeBoardModify] onClickCancelHandler");
        navigate(`/freeboard/${freeboard.freeboardCode}`, { replace: false});
    };

    return (
        <>
            <div>
                <h1>FreeBoard Modify Page</h1>
            </div>
            <div>
                <label>제목 : <input
                    placeholder="제목"
                    name="freeboardTitle"
                    onChange={ onChangeHanlder }
                    value={form.freeboardTitle}
                /></label>
                <br/>
                <label>설명 : <input
                    placeholder="설명"
                    name="freeboardContent"
                    onChange={ onChangeHanlder }
                    value={form.freeboardContent}
                /></label>
                <br/>
                <button onClick={onClickSaveHandler}>수정하기</button>
                <button onClick={onClickCancelHandler}>취소하기</button>
            </div>
        </>
    );
}