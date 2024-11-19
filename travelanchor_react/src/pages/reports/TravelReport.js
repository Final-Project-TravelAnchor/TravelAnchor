import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callTravelReportListAPI } from '../../apis/TravelReportAPICalls';

const TravelReportList = () => {
    const dispatch = useDispatch();
    const travelReport = useSelector((state) => state.travelReportReducer);

    useEffect(() => {
        // Redux 액션 호출
        dispatch(callTravelReportListAPI());
    }, [dispatch]);

    return (
        <div>
        <h1>여행 후기 리스트</h1>
        {Array.isArray(travelReport) && travelReport.length > 0 ? (
            <ul>
            {travelReport.map((report) => (
                <li key={report.reportCode}>
                후기 : {report.reportTitle}, 여행지 : {report.reportDestination}, 테마 : {report.reportTheme}, 내용 : {report.reportContent}, 작성일 : {report.reportCreatedAt}
                </li>
            ))}
            </ul>
        ) : (
            <p>데이터가 없습니다.</p>
        )}
        </div>
    );
};

export default TravelReportList;
