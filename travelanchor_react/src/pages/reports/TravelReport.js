import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callTravelReportListAPI } from '../../apis/TravelReportAPICalls';
import { useNavigate } from 'react-router-dom';
import { isLogin } from '../../utils/tokenUtils';
import TravelReportList from './TravelReportList';

export default function TravelReport () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const travelReport = useSelector(state => state.travelReportReducer || []);
    const [loading, setLoading] = useState(true);
    // const [auth, setAuth] = useState(null);

    // useEffect(() => {
    //     // Redux 액션 호출
    //     dispatch(callTravelReportListAPI());
    // }, []);

    useEffect(() => {
        const fetchTravelReport = async () => {
            setLoading(true);
            await dispatch(callTravelReportListAPI());
            setLoading(false);
        };

        fetchTravelReport();
    }, [dispatch]);

    // useEffect(() => {
    //     const authValue = findAuth();
    //     setAuth(authValue);
    //     console.log("auth : ", authValue);
    // }, []);

    const onClickCreateTravelReport = () => {

        if(!isLogin()) {
			navigate("/login", { replace: false });
            return;
        }

        console.log('onClickCreateTravelReport called');
        navigate("/AddReportDate");
    };

    // const onClickTravelReportHandler = (travelReport) => {
    //     console.log("onClickTravelReportHandler : " + travelReport.reportCode);
    //     navigate(`/travelReport/${travelReport.reportCode}`, { replace: false, state: travelReport});
    // };

    return (
        <div>
            <div>
            <button onClick={onClickCreateTravelReport}>후기 생성</button>
            </div>

        {/* <div>
            <h1>여행 후기 리스트</h1>
            {Array.isArray(travelReport) && travelReport.length > 0 ? (
                <ul>
                    {travelReport.map((travelReport) => (
                        <li
                            key={travelReport.reportCode}
                            onClick={() => onClickTravelReportHandler(travelReport)} // 개별 항목 전달
                            style={{ cursor: 'pointer' }}
                        >
                            후기 : {travelReport.reportTitle}, 여행지 : {travelReport.reportDestination}, 내용 : {travelReport.reportContent}, 작성일 : {travelReport.reportCreatedAt}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>데이터가 없습니다.</p>
            )}
        </div> */}

                <div>
                    {travelReport?.length > 0 
                        ? travelReport.map((travelReport) => (
                            <TravelReportList 
                                key={travelReport.reportCode} 
                                travelReport={travelReport} 
                            />
                          ))
                        : <div>후기가 없습니다.</div>
                    }
                </div>
</div>
    );
};