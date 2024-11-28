import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { callDeleteTravelReportAPI } from "../../apis/TravelReportAPICalls";
import "./TravelReportDetail.css";

export default function TravelReportDetail() {
    const location = useLocation();
    const travelReport = location.state;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickModifyModeHandler = (travelReport) => {
        navigate(`/travelReport/travelReportModify/${travelReport.reportCode}`, { state: travelReport, replace: false });
    };

    const onClickDeleteHandler = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            const deletedTravelReport = {
                ...travelReport,
                reportIsdeleted: 'Y',
            };

            try {
                await dispatch(callDeleteTravelReportAPI(deletedTravelReport));
                alert("게시글이 삭제되었습니다.");
                navigate(-1);
            } catch (err) {
                console.error("Error deleting TravelReport: ", err);
                alert("게시글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    const onClickBackHandler = () => {
        navigate(-1);
    };

    return (
        <div className="travel-report-detail-container">
            {/* <h1 className="travel-report-detail-title">상세조회</h1> */}
            {travelReport ? (
                <div className="travel-report-detail-content">
                    <h2>{travelReport.reportTitle}</h2>
                    {/* <hr/> */}
                    <h3>여행지 : {travelReport.reportDestination}</h3>
                    <h3>여행일 : {travelReport.reportStartDate} ~ {travelReport.reportEndDate}</h3>
                    <hr/>
                    <h3>내용 : {travelReport.reportContent}</h3>
                    <hr/>
                    <h3>작성일 : {travelReport.reportCreatedAt}</h3>
                </div>
            ) : (
                <div className="travel-report-detail-error">후기를 찾을 수 없습니다.</div>
            )}

            <div className="travel-report-detail-buttons">
                <button className="travel-report-button" onClick={onClickBackHandler}>뒤로가기</button>
                <button className="travel-report-button" onClick={() => onClickModifyModeHandler(travelReport)}>수정하기</button>
                <button className="travel-report-button delete" onClick={onClickDeleteHandler}>삭제하기</button>
            </div>
        </div>
    );
}
