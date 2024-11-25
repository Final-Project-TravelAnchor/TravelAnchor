import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, replace, useNavigate, useParams } from "react-router-dom";
import { callCreateTravelPlanAPI } from "../../apis/TravelPlanAPICalls";
import { cityReducer, selectedCityReducer } from "../../modules/CityModule";
import planReducer from '../../modules/PlanModule';



export default function TravelPlanCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedCity = useSelector((state) => state.selectedCityReducer);
    const selectedCityName = selectedCity.selectedCity.toString();
    console.log(selectedCityName);
	const selectedDate = useSelector((state) => state.planReducer);
    const startDate = selectedDate.startDate.split("T")[0];
    const endDate = selectedDate.endDate.split("T")[0];
    console.log(startDate);
    console.log(endDate);

	// 시작일과 종료일을 Date 객체로 변환
	const start = new Date(startDate);
	const end = new Date(endDate);

	// 날짜 차이 계산 (밀리초 기준)
	const differenceInTime = end - start;

	// 밀리초를 일 단위로 변환
	const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

	// 총 날짜 문자열 생성
	const totalDate = `${differenceInDays + 1}일`;

	console.log(totalDate);


    const [ form, setForm ] = useState({
        travelCode: null,
        memberCode: 1,  // 본인 코드 가져와야 함
        travelName: "Title", 
        travelStartDate: startDate,
		travelEndDate: endDate,
		travelTotalDate: totalDate,
        travelDestination: selectedCityName,
        travelOnoff: "N",
        travelIsdeleted: "N"
    })

    const onClickCreateTravelPlanHandler = async () => {
        console.log("[TravelPlan] onClickCreateTravelPlanHandler");

        // form 값으로 API 요청
        await dispatch(callCreateTravelPlanAPI(form));

        navigate("/plans/TravelPlan");

    };

    const onClickCancelTravelPlanHandler = () => {
        console.log("[TravelPlanCreate] onClickCancelTravelPlanHandler");
        navigate("/plans/TravelPlan");
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h1>{selectedCityName} 여행 일정을 계획해보세요!</h1>
            <label>제목 : <input
                type="text"
                name="travelName"
                placeholder="여행의 타이틀을 멋드러지게 입력"
                onChange={onChangeHandler}
            /></label>
            <br/>
            <button onClick={onClickCreateTravelPlanHandler}>추가하기</button>
            <button onClick={onClickCancelTravelPlanHandler}>취소하기</button>
        </div>
    );
}