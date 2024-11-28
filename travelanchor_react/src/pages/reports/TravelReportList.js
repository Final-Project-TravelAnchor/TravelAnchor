import { useNavigate } from "react-router-dom";
import "./TravelReportList.css";  // CSS 파일 import

export default function TravelReportList({ travelReport }) {
    const navigate = useNavigate();

    // isDeleted 값이 N인 게시글만 보여짐
    if (travelReport?.reportIsdeleted !== "N") {
        return null;
    }

    const onClickTravelReportHandler = (travelReport) => {
        console.log("onClickTravelReportHandler");
        navigate(`/travelReport/${travelReport.reportCode}`, { replace: false, state: travelReport });
    };

    return (
        <div className="travel-report-list-container">
            <div className="travel-report-item" onClick={() => onClickTravelReportHandler(travelReport)}>
                {/* <h5 className="travel-report-title">{travelReport.reportCode}</h5> */}
                <h5 className="travel-report-title">{travelReport.reportTitle}</h5>
                <p className="travel-report-content">{travelReport.reportContent}</p>
                <span className="travel-report-created-at">{travelReport.reportCreatedAt}</span>
            </div>
        </div>
    );
}
