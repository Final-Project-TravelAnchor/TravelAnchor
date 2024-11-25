import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callUpdateNoticeAPI, callNoticeListAPI } from "../../apis/NoticeAPICalls";
import { useDispatch } from "react-redux";
import './NoticeModify.css';


export default function NoticeModify() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log(location.state);
    const notice = location.state || {};
    console.log("[NoticeModify] notice: " , notice);

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
        // navigate(`/notice/${notice.noticeCode}`, { replace: false });
        navigate(`/notice`, { replace: false });
    };

    // 취소
    const onClickCancelHandler = () => {
        console.log("[NoticeModify] onClickCancelHandler");
        navigate(-1);;
    };

    return (
        <>
            <div className="notice-container">
                <h1 className="notice-title">공지사항 수정</h1>
            <div>
                <div className="notice-update-container">
                <div className="notice-update-title">제목</div>
                <input
                    className="notice-update-title-input"
                    type="text"
                    name="noticeName"
                    placeholder="공지사항 제목"
                    onChange={onChangeHanlder}
                /></div>
                <br/>
                <div className="notice-update-container">
                    <div className="notice-update-title">내용</div>
                <input
                    className="notice-update-content-input"
                    type="text"
                    name="noticeContents"
                    placeholder="공지사항 설명"
                    onChange={onChangeHanlder}
                />
                </div>
                <br/>
                <div className="notice-button-right">
                    <button onClick={onClickCancelHandler} className="notice-back-button">취소하기</button>
                    <button onClick={onClickSaveHandler} className="notice-modify-button">수정완료</button>
                </div>
            </div>
            </div>
        </>
    );
}