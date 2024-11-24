import { useNavigate } from 'react-router-dom'
// import { isLogin } from '../../utils/tokenUtils';

export default function TravelReportList (travelReportDetail) {

    const travelReport = travelReportDetail.travelReport;
    const navigate = useNavigate();

    const onClickTravelReportHandler = (travelReport) => {
        console.log("onClickTravelReportHandler");
        navigate(`/travelReport/${travelReport.reportCode}`, { replace: false, state: travelReport});
    };

    return (
        <>
            <div 
                onClick={() => onClickTravelReportHandler(travelReport)}    
            >
                <h5>{travelReport.reportCode}</h5>
                <h5>{travelReport.reportTitle}</h5>
                <h5>{travelReport.reportContent}</h5>
                <h5>{travelReport.reportCreatedAt}</h5>
            </div>
        </>
    );
};