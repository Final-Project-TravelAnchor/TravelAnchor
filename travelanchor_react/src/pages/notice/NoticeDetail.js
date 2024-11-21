import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { callPopulationDetailAPI } from "../../apis/PopulationAPICalls";
import { useLocation } from "react-router-dom";
import "./NoticeDetail.css";


export default function NoticeDetail() {

    const location = useLocation();
    const notice = location.state;
    console.log(notice);

    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const population = useSelector(state => state.populationReducer)
    // const populationDetail = population.data;
    // console.log(populationDetail);

    const onClickModifyModeHandler = (notice) => {
        console.log("[NoticeDetail]onClickModifyModeHandler ", notice);
        navigate(`/notice/noticeModify/${notice.noticeCode}`, { state: notice, replace: false });
        // navigate(`/items/${populationCode}`, { replace: false});
    };

    useEffect(() => {
        console.log("[NoticeDetail] notice useEffect");
        // dispatch(callPopulationDetailAPI(populationCode));
    }, []);

    const onClickBackHandler = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className="notice-container">
            <div className="notice-title">{notice.noticeName}</div>

        {/* 공지사항 상세 정보 */}
        {notice ? (
            <div className="notice-detail-content">
                {/* <h1 className="notice-title">제목 : {notice.noticeName}</h1> */}
                <h2 className="notice-info">작성일 : {notice.noticeCreatedAt}</h2>
                <h2 className="notice-info">조회수 : {notice.noticeViews}</h2>
                <div className="notice-content-container">
                    <h3 className="notice-content">{notice.noticeContents}</h3>
                </div>
            </div>
        ) : (
            <div className="no-notice">공지사항을 찾을 수 없습니다.</div>
        )}

        <div className="notice-button-right">
                <button className="notice-back-button" onClick={onClickBackHandler}>
                    뒤로가기
                </button>
                <button 
                    onClick={() => onClickModifyModeHandler(notice)}
                    className="notice-modify-button" 
                >
                    수정하기
                </button>
        </div>
    </div>
    );
}