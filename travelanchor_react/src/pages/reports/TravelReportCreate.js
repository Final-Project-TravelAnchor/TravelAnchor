import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, replace, useNavigate, useParams } from "react-router-dom";
import { callCreateTravelReportAPI } from "../../apis/TravelReportAPICalls";
import { cityReducer, selectedCityReducer } from "../../modules/CityModule";


export default function ReportCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedCity = useSelector((state) => state.selectedCityReducer);
    const selectedCityName = selectedCity.selectedCity.toString();
    console.log(selectedCityName);

    const today = new Date().toISOString().split('T')[0];
    // console.log(today);

    const [ form, setForm ] = useState({
        reportCode: null,
        memberCode: 1,  // 본인 코드 가져와야 함
        reportTitle: "Title", 
        reportContent: "Content",
        reportDestination: selectedCityName,
        reportCreatedAt: today,
        reportIsdeleted: "N"
    })

    const onClickCreateTravelReportHandler = async () => {
        console.log("[ReportCreate] onClickCreateTravelReportHandler");

        // form 값으로 API 요청
        await dispatch(callCreateTravelReportAPI(form));

        navigate("/travelReport");

    };

    const onClickCancelTravelReportHandler = () => {
        console.log("[ReportCreate] onClickCancelTravelReportHandler");
        navigate("/travelReport");
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h1>{selectedCityName}의 여행이 어땠는지 남겨주세요</h1>
            <label>제목 : <input
                type="text"
                name="reportTitle"
                placeholder="제목"
                onChange={onChangeHandler}
            /></label>
            <br/>
            <label> 내용 <input
                type="text"
                name="reportContent"
                placeholder="내용을 입력하세요."
                onChange={onChangeHandler}
            /></label>
            <br/>
            <button onClick={onClickCreateTravelReportHandler}>추가하기</button>
            <button onClick={onClickCancelTravelReportHandler}>취소하기</button>
        </div>
    );
}