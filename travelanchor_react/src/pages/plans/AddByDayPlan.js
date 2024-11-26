import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddByDayPlan() {
    const navigate = useNavigate();

    const totalDate = useSelector((state) => state.planReducer.totalDate);
    const selectedCity = useSelector((state) => state.selectedCityReducer);
    const selectedCityName = selectedCity.selectedCity.toString();
    const maxTravelCode = useSelector((state) => state.travelPlanReducer.data);

    // 최초 렌더링 시 maxTravelCode를 고정하기 위한 useRef
    const fixedMaxTravelCodeRef = useRef(null);
    console.log("AddByDayPlan fixedMaxTravelCodeRef1 : ", fixedMaxTravelCodeRef);

    useEffect(() => {
        // 첫 번째 렌더링 시 maxTravelCode를 설정
        if (maxTravelCode && !fixedMaxTravelCodeRef.current) {
            fixedMaxTravelCodeRef.current = maxTravelCode;
            console.log("AddByDayPlan fixedMaxTravelCodeRef2 : ", fixedMaxTravelCodeRef);
        }
    }, [maxTravelCode]);

    // 숫자 값 추출
    const numberOfDays = totalDate ? parseInt(totalDate.replace(/[^0-9]/g, ""), 10) : 0;
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        if (numberOfDays > 0) {
            const generatedButtons = [];
            for (let i = 1; i <= numberOfDays; i++) {
                generatedButtons.push(
                    <button key={i} onClick={() => handleDayClick(i)}>
                        Day {i} <br /> +
                    </button>
                );
            }
            setButtons(generatedButtons);
        }
    }, [numberOfDays]);

    const handleDayClick = (day) => {
        console.log(`Day ${day} 버튼 클릭됨`);
        navigate(`/plans/day/${day}`, {
            state: {
                dayNumber: day,
                city: selectedCityName,
                maxTravelCode: fixedMaxTravelCodeRef.current, // 고정된 값 전달
            },
        });
    };

    return (
        <>
        <div>
        <h1>{selectedCityName} 여행 일정</h1>
        {buttons.length > 0 ? buttons : <p>등록할 일정이 없습니다.</p>}
    </div>
    <div>

    </div>
        </>
        
    );
}
