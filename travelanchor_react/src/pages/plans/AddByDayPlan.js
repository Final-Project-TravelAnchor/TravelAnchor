import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { callTravelDayListAPI } from "../../apis/TravelPlanAPICalls";
import { callCreateActivityPlanAPI } from "../../apis/ActivityAPICalls";

export default function AddByDayPlan() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // const location = useLocation();
    // const form = location.state || {};
    // console.log("AddByDayPlan form : ", form);
    // const totalDate = useSelector((state) => state.planReducer.totalDate);
    // const selectedCity = useSelector((state) => state.selectedCityReducer);
    // const selectedCityName = selectedCity.selectedCity.toString();
    const maxTravelCode = useSelector((state) => state.travelPlanReducer.data); // 얘가 최대 Travel Code를 던짐
    const form = useSelector(state => state.planReducer);
    console.log("AddByDayPlan form : ", form);

    const travelDayList = useSelector(state => state.travelDayReducer);
    console.log("AddByDayPlan travelDayList : ", travelDayList);

    const location = useLocation();
    const createdActivityPlan = location.state || {};
    console.log("CreateActivityPlan: ", createdActivityPlan)
    const dayMax = useSelector(state => state.travelDayReducer);;
    console.log("DayMax: ", dayMax);


    // 숫자 값 추출
    const numberOfDays = form.travelTotalDate ? parseInt(form.travelTotalDate.replace(/[^0-9]/g, ""), 10) : 0;
    console.log(numberOfDays);
    const [buttons, setButtons] = useState([]);

    const handleDayClick = (day) => {
        console.log(`Day ${day} 버튼 클릭됨`);
        navigate(`/plans/day/${day}`, {
            state: {
                travelCode: maxTravelCode,
                dayNumber: day,
                dayDate: day,
                // form: form,
            },
        });
    };

    useEffect(() => {
        dispatch(callTravelDayListAPI());
    }, []);

    return (
        <>
            <div>
                {numberOfDays > 0 ? (
                    Array.from({ length: numberOfDays }, (_, i) => (
                        <button key={i + 1} onClick={() => handleDayClick(i + 1)}>
                            | Day {i + 1} |<br /> +
                        </button>
                    ))
                ) : (
                    <p>등록할 일정이 없습니다.</p>
                )}
            </div>
            <div>
                {/* 추가 콘텐츠를 여기에 작성 */}
            </div>
        </>
    );
}
