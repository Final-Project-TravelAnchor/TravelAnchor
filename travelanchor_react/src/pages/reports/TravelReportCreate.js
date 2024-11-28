import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, replace, useNavigate, useParams } from "react-router-dom";
import { callCreateTravelReportAPI } from "../../apis/TravelReportAPICalls";
import { cityReducer, selectedCityReducer } from "../../modules/CityModule";
import planReducer from '../../modules/PlanModule';
import './TravelReportCreate.css';


export default function ReportCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedCity = useSelector((state) => state.selectedCityReducer);
    const selectedCityName = selectedCity.selectedCity.toString();
    // console.log(selectedCityName);
    const selectedDate = useSelector((state) => state.planReducer);
    const startDate = selectedDate.startDate.split("T")[0];
    const endDate = selectedDate.endDate.split("T")[0];
    // console.log(startDate);
    // console.log(endDate);

    const today = new Date().toISOString().split('T')[0];
    // console.log(today);

    const [ form, setForm ] = useState({
        reportCode: null,
        memberCode: 1,  // 본인 코드 가져와야 함
        reportTitle: "Title", 
        reportContent: "Content",
        reportStartDate: startDate,
        reportEndDate: endDate,
        reportDestination: selectedCityName,
        reportCreatedAt: today,
        reportIsdeleted: "N"
    })

    console.log("form" + form);

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
        <div className="report-create-container">
            <h1 className="report-create-title">
                {selectedCityName}의 여행이 어땠는지 남겨주세요</h1>
            <h3 className="report-create-dates">
                시작일 : {startDate} <br/>
                종료일 : {endDate}</h3>
                <br/>
            <div className="report-create-section">
                <input
                type="text"
                name="reportTitle"
                placeholder="  제목"
                onChange={onChangeHandler}
                className="report-create-input"
            /></div>
            <br/>
            <div className="report-create-section">
                <input
                type="text"
                name="reportContent"
                placeholder=" 내용을 입력하세요."
                onChange={onChangeHandler}
                className="report-create-content-input"
            /></div>
            <div className="report-create-buttons">
            <br/>
            <button onClick={onClickCreateTravelReportHandler}
            className='report-create-button'>추가하기</button>
            <button onClick={onClickCancelTravelReportHandler}
            className='report-cancle-button'>취소하기</button>
            </div>
        </div>
    );
}