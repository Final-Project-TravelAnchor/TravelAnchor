import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { callUpdateTravelReportAPI } from "../../apis/TravelReportAPICalls";
import { useLocation } from "react-router-dom";
// import "./TravelReportDetail.css";

export default function TravelReportDetail() {

    const location = useLocation();
    const travelReport = location.state;
    console.log(travelReport);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickModifyModeHandler = (travelReport) => {
        console.log("[TravelReportDetail]onClickModifyModeHandler ", travelReport);
        navigate(`/travelReportModify/${travelReport.reportCode}`, { state: travelReport, replace: false });
    };

    useEffect(() => {
        console.log("[TravelReportDetail] travelReport useEffect");

        dispatch(callUpdateTravelReportAPI(travelReport.reportCode));
    }, []);

    const onClickBackHandler = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div>
            <h1>상세조회</h1>
        {travelReport ? (
            <div>
                <h2>제목 : {travelReport.reportTitle}</h2>
                <h3>내용 : {travelReport.reportContent}</h3>
                <h3>작성일 : {travelReport.reportCreatedAt}</h3>
            </div>
        ) : (
            <div>후기를 찾을 수 없습니다.</div>
        )}

        <div>
            <button onClick={onClickBackHandler}>
                뒤로가기
            </button>

            <button 
                onClick={() => onClickModifyModeHandler(travelReport)}
            >
                수정하기
            </button>
        </div>
    </div>
    );
}