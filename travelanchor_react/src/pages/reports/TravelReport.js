import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callTravelReportListAPI } from '../../apis/TravelReportAPICalls';
import { useNavigate } from 'react-router-dom';
import { isLogin } from '../../utils/tokenUtils';
import TravelReportList from './TravelReportList';
import './TravelReport.css'; 

export default function TravelReport () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const travelReport = useSelector(state => state.travelReportReducer || []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTravelReport = async () => {
            setLoading(true);
            await dispatch(callTravelReportListAPI());
            setLoading(false);
        };

        fetchTravelReport();
    }, [dispatch]);

    const onClickCreateTravelReport = () => {
        if(!isLogin()) {
            navigate("/login", { replace: false });
            return;
        }

        console.log('onClickCreateTravelReport called');
        navigate("/travelReport/AddReportDate");
    };

    return (
        <div className="travel-report-container">
            <h1> 여행 후기 보기 </h1>
            <div className="create-travel-report-button-container">
                <button className="create-travel-report-button" onClick={onClickCreateTravelReport}>
                    + 후기 추가하기
                </button>
            </div>

            <div className="travel-report-list-container">
                {travelReport?.length > 0 
                    ? travelReport.map((travelReport) => (
                        <TravelReportList 
                            key={travelReport.reportCode} 
                            travelReport={travelReport} 
                        />
                    ))
                    : <div className="no-travel-report-message">후기가 없습니다.</div>
                }
            </div>
        </div>
    );
}
