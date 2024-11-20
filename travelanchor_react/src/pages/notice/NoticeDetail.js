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
        <div className="notice-detail-container">
            <div className="notice-title">공지사항</div>
            {/* 헤더: 뒤로가기 버튼과 수정하기 버튼 */}
            <div className="header">
                <button className="back-button" onClick={onClickBackHandler}>
                    뒤로가기
                </button>
                <button 
                    className="modify-button" 
                    onClick={() => onClickModifyModeHandler(notice)}
                >
                    수정하기
                </button>
            </div>

        {/* 공지사항 상세 정보 */}
        {notice ? (
            <div className="notice-detail-content">
                <h1 className="notice-title">제목 : {notice.noticeName}</h1>
                <h2 className="notice-info">생성일자 : {notice.noticeCreatedAt}</h2>
                <h2 className="notice-info">조회수 : {notice.noticeViews}</h2>
                <h3 className="notice-content">내용 : {notice.noticeContents}</h3>
            </div>
        ) : (
            <div className="no-notice">공지사항을 찾을 수 없습니다.</div>
        )}
    </div>
    );
}