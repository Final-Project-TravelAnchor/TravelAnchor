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
        <div className="notice-create-container">
            <h1 className="create-title">공지사항 생성</h1>

            <div className="form-group">
                <label htmlFor="noticeName" className="form-label">
                    공지사항 제목:
                </label>
                <input
                    type="text"
                    id="noticeName"
                    name="noticeName"
                    placeholder="공지사항 제목"
                    onChange={onChangeHandler}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="noticeContents" className="form-label">
                    공지사항 설명:
                </label>
                <textarea
                    id="noticeContents"
                    name="noticeContents"
                    placeholder="공지사항 설명"
                    onChange={onChangeHandler}
                    className="form-textarea"
                />
            </div>

            <div className="button-group">
                <button 
                    className="create-button" 
                    onClick={onClickCreateNoticeHandler}
                >
                    추가하기
                </button>
                <button 
                    className="cancel-button" 
                    onClick={onClickCancelNoticeHandler}
                >
                    취소하기
                </button>
            </div>
        </div>
    );
}