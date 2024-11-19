import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callTravelReportListAPI } from '../../apis/TravelReportAPICalls';

const TravelReportList = () => {
    const dispatch = useDispatch();
    const travelReport = useSelector((state) => state.travelReportReducer);

    useEffect(() => {
        dispatch(callTravelReportListAPI);
    }, [dispatch]);

    return (
        <div>
            <h1>후기 리스트</h1>
            {Array.isArray(travelReport) && travelReport.length > 0 ? (
                <ul>
                {travelReport.map((report) => (
                    <li key={report.reportCode}>
                    활동금액세부코드: {report.reportCode}
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