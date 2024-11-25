import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { callDeleteTravelReportAPI } from "../../apis/TravelReportAPICalls";

export default function TravelReportDetail() {
    const location = useLocation();
    const travelReport = location.state;
    console.log(travelReport);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickModifyModeHandler = (travelReport) => {
        console.log("[TravelReportDetail] onClickModifyModeHandler ", travelReport);
        navigate(`/travelReportModify/${travelReport.reportCode}`, { state: travelReport, replace: false });
    };

    // 삭제
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

    // 뒤로가기
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
                    <h3>여행일 : {travelReport.reportStartDate} ~ {travelReport.reportEndDate}</h3>
                    <h3>여행지 : {travelReport.reportDestination}</h3>
                </div>
            ) : (
                <div>후기를 찾을 수 없습니다.</div>
            )}

            <div>
                <button onClick={onClickBackHandler}>뒤로가기</button>
                <button onClick={() => onClickModifyModeHandler(travelReport)}>수정하기</button>
                <button onClick={onClickDeleteHandler}>삭제하기</button>
            </div>
        </div>
    );
}
