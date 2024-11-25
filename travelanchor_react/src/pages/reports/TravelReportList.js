import { useNavigate } from "react-router-dom";

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
        <>
            <div onClick={() => onClickTravelReportHandler(travelReport)}>
                <h5>{travelReport.reportCode}</h5>
                <h5>{travelReport.reportTitle}</h5>
                <h5>{travelReport.reportContent}</h5>
                <h5>{travelReport.reportCreatedAt}</h5>
            </div>
        </>
    );
}
