import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callUpdateNoticeAPI, callNoticeListAPI } from "../../apis/NoticeAPICalls";
import { useDispatch } from "react-redux";


export default function NoticeModify() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log(location.state);
    const notice = location.state || {};
    console.log("[NoticeModify] notice: " + notice);

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
        const updatedNotice = {
            ...notice,
            noticeName: form.noticeName,
            noticeContents: form.noticeContents,
        };

        await dispatch(callUpdateNoticeAPI(updatedNotice));
        navigate(`/notice/${notice.noticeCode}`, { replace: false});
    };

    // 취소
    const onClickCancelHandler = () => {
        console.log("[NoticeModify] onClickCancelHandler");
        navigate(`/items/${notice.noticeCode}`, { replace: false});
    };

    return (
        <>
            <div>
                <h1>Notice Modify Page</h1>
            </div>
            <div>
                <label>제목 : <input
                    placeholder="제목"
                    name="noticeName"
                    onChange={ onChangeHanlder }
                    value={form.noticeName}
                /></label>
                <br/>
                <label>내용 : <input
                    placeholder="내용"
                    name="noticeContents"
                    onChange={ onChangeHanlder }
                    value={form.noticeContents}
                /></label>
                <br/>
                <button onClick={onClickSaveHandler}>수정하기</button>
                <button onClick={onClickCancelHandler}>취소하기</button>
            </div>
        </>
    );
}