import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from "react-redux";
import { SET_DATE_PERIOD } from '../../modules/PlanModule';

function AddReportDate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 시작일과 종료일 상태 관리
    const [datePeriod, setDatePeriod] = useState([null, null]);
    const [startDate, endDate] = datePeriod;

    // 날짜 변환 함수
    const formatDate = (date) => {
        const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // UTC 보정
        return offsetDate.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식 반환
    };

    // 초기화 버튼 핸들러
    const reset = () => {
        setDatePeriod([null, null]);
    };

    // 다음 페이지 이동 핸들러
    const nextPage = () => {
        if (startDate && endDate) {
            dispatch({
                type: SET_DATE_PERIOD,
                payload: {
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate),
                },
            });
            console.log("nextPage");
            navigate('/travelReport/AddReportDestination');
        } else {
            alert('시작일과 종료일을 모두 선택해주세요.');
        }
    };

    return (
        <div>
            <h3>여행 날짜를 선택해 주세요</h3>
            <DatePicker
                selected={startDate}
                onChange={(update) => setDatePeriod(update)}
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
                <button onClick={reset}>초기화</button>
                <button onClick={nextPage}>&gt;</button>
            </div>
        </div>
    );
}

export default AddReportDate;
