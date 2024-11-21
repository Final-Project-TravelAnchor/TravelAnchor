import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, replace, useNavigate, useParams } from "react-router-dom";
import { callCreateNoticeAPI } from "../../apis/NoticeAPICalls";
import './NoticeCreate.css';


export default function NoticeCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0];
    // console.log(today);

    const [ form, setForm ] = useState({
        noticeCode: null,
        noticeName: 'NoticeCreate',
        noticeWriter: '관리자',
        noticeCreatedAt: today,
        noticeViews: 0,
        noticeContents: 'NoticeContents',
        noticeOnoff: "Y",
    })

    useEffect( () => {
        // 국가 TBL에 접근할 dispatch 구현하기
        // dispatch(call)
    }, []);

    const onClickCreateNoticeHandler = async () => {
        console.log("[NoticeCreate] onClickCreateNoticeHandler");

        // form 값으로 API 요청
        await dispatch(callCreateNoticeAPI(form));

        navigate(`/notice`);

    };

    const onClickCancelNoticeHandler = () => {
        console.log("[NoticeCreate] onClickCancelNoticeHandler");
        navigate(`/notice`);
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    return (
        <>
            <div className="notice-container">
                <h1 className="notice-title">공지사항 생성</h1>
            <div>
                <div className="notice-create-container">
                <div className="notice-create-title">제목</div>
                <input
                    className="notice-create-title-input"
                    type="text"
                    name="noticeName"
                    placeholder="공지사항 제목"
                    onChange={onChangeHandler}
                /></div>
                <br/>
                <div className="notice-create-container">
                    <div className="notice-create-title">내용</div>
                <input
                    className="notice-create-content-input"
                    type="text"
                    name="noticeContents"
                    placeholder="공지사항 설명"
                    onChange={onChangeHandler}
                />
                </div>
                <br/>
                <div className="notice-button-right">
                    <button 
                        onClick={onClickCancelNoticeHandler}
                        className="notice-cancel-button" 
                        >
                        취소하기
                    </button>
                    <button 
                        onClick={onClickCreateNoticeHandler}
                        className="notice-create-button"
                        >
                        추가하기
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}