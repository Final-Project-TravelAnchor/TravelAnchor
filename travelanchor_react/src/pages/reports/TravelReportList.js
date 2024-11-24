import { useNavigate } from "react-router-dom";

export default function TravelReportList({ travelReport }) {
    const navigate = useNavigate();

    // reportIsdeleted가 "N"인지 확인
    if (travelReport?.reportIsdeleted !== "N") {
        return null; // "N"이 아닌 데이터는 렌더링하지 않음
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
