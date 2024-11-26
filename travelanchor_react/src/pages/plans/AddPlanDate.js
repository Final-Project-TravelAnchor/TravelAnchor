import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from "react-redux";
import { SET_DATE_PERIOD } from '../../modules/PlanModule';

function AddPlanDate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const { travelReport } = useSelector(state => state.planReducer);

    // 시작일과 종료일 상태를 관리
    const [datePeriod, setDatePeriod] = useState([null, null]);
    const [startDate, endDate] = datePeriod;

    // 선택된 날짜 초기화 핸들러
    const reset = () => {
        setDatePeriod([null, null]);
    };

    // useEffect(
    //     () => {
    //         startDate = travelReport.startDate || null;
    //         endDate = travelReport.endDate || null;
    //     },
    //     [result]
    // );

    // 다음 페이지 이동 핸들러
    const nextPage = () => {
        if (startDate && endDate) {
            dispatch({
                type: SET_DATE_PERIOD,
                payload: {
                  startDate: startDate.toISOString(),
                  endDate: endDate.toISOString(),
                }
              });
            console.log("nextPage");
        // 날짜가 모두 선택되었을 때만 이동
            navigate('/plans/AddPlanDestination');
        } else {
        alert('시작일과 종료일을 모두 선택해주세요.');
        }
    };

    return (
        <div>
        <h3>여행 날짜를 선택해 주세요</h3>
        <DatePicker
            selected={startDate}
            onChange={(update) => {
            setDatePeriod(update);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            placeholderText="시작일과 종료일 선택"
            dateFormat="yyyy/MM/dd"
            minDate={new Date()}
        />

        {/* 버튼 */}
        <div>
            {/* 초기화 버튼 */}
            <button onClick={reset}>
            초기화
            </button>
            
            {/* 다음 페이지 이동 버튼 */}
            <button onClick={nextPage}>
            &gt; {/* ">" 표시 */}
            </button>
        </div>
        </div>
    );
}

export default AddPlanDate;
