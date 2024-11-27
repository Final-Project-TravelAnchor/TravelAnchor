import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callTravelReportByMemberCodeAPI, callTravelReportListAPI } from "../../apis/TravelReportAPICalls";

export default function TravelReportByName() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux 상태에서 로그인한 사용자의 memberCode 가져오기
    const memberCode = useSelector((state) => state.memberReducer.member?.memberCode);
    console.log("memberCode for API call: ", memberCode);

    // travelReport와 loading 상태를 Redux에서 가져오기
    const travelReport = useSelector((state) => state.travelReportReducer);
    const [loading, setLoading] = useState(true);  // 로딩 상태 추가
    console.log("Redux에서 불러온 travelReport:", travelReport);

    useEffect(() => {
        const fetchTravelReport = async () => {
            setLoading(true);
            await dispatch(callTravelReportListAPI());
            setLoading(false);
        };

        fetchTravelReport();
    }, [dispatch]);

    useEffect(() => {
        if (memberCode) {
            // API 호출 후 로딩 상태 변경
            dispatch(callTravelReportByMemberCodeAPI(memberCode))
                .finally(() => setLoading(false));  // 로딩 끝
        }
    }, [memberCode, dispatch]);

    // 로딩 중일 때는 로딩 메시지 출력
    if (loading) {
        return <div>로딩 중...</div>;
    }

    // 여행 후기 데이터가 없을 경우
    if (!travelReport || travelReport.length === 0) {
        return <div>표시할 후기가 없습니다.</div>;
    }

    // 조건에 맞는 후기를 필터링
    const filteredReports = travelReport.filter(
        (report) => report.memberCode === memberCode && report.reportIsdeleted === "N"
    );

    // 필터링된 후기가 없을 경우
    if (filteredReports.length === 0) {
        return <div>해당 사용자의 후기가 없습니다.</div>;
    }

    // 여행 후기를 클릭했을 때
    const onClickTravelReportHandler = (travelReport) => {
        console.log("onClickTravelReportHandler");
        navigate(`/travelreport/${travelReport.reportCode}`, { replace: false, state: travelReport });
    };

    return (
        <>
            {filteredReports.map((report) => (
                <div
                    key={report.reportCode}
                    onClick={() => onClickTravelReportHandler(report)}
                >
                    <h5>{report.reportCode}</h5>
                    <h5>{report.reportTitle}</h5>
                    <h5>{report.reportContent}</h5>
                    <h5>{report.reportCreatedAt}</h5>
                </div>
            ))}
        </>
    );
}
