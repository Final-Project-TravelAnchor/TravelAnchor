import React from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callCountryAPI, callCityByCountryCodeAPI, callCityAPI, callCountryByCountryCodeAPI } from '../../apis/AreaAPICalls';
import { Navigate, replace, useNavigate, useParams } from "react-router-dom";
import { callCreateTravelPlanAPI } from "../../apis/TravelPlanAPICalls";
import { cityReducer, selectedCityReducer } from "../../modules/CityModule";
import planReducer from '../../modules/PlanModule';
import {
    SET_FORM,
} from "../../modules/PlanModule";
import './TravelPlanCreate.css';

export default function TravelPlanCreate() {

    const [selectedCountry, setSelectedCountry] = useState(1); // 국가 코드로 초기값 설정
    const [selectedCity, setSelectedCity] = useState("");
    const [datePeriod, setDatePeriod] = useState([null, null]);
    const [startDate, endDate] = datePeriod;

    const countryList = useSelector((state) => state.areaReducer); // 국가 리스트
    // console.log("TravelPlanCreate countryList: " , countryList);
    const cityList = useSelector((state) => state.cityReducer); // 도시 리스트
    // console.log("TravelPlanCreate cityList: " , cityList);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const selectedCity = useSelector((state) => state.selectedCityReducer);
    // const selectedCityName = selectedCity.selectedCity.toString();
    // console.log(selectedCityName);
	// const selectedDate = useSelector((state) => state.planReducer);
    // const startDate = selectedDate.startDate.split("T")[0];
    // const endDate = selectedDate.endDate.split("T")[0];
    // console.log(startDate);
    // console.log(endDate);

	// 시작일과 종료일을 Date 객체로 변환
	// const start = new Date(startDate);
	// const end = new Date(endDate);

	// 날짜 차이 계산 (밀리초 기준)
	// const differenceInTime = end - start;

	// 밀리초를 일 단위로 변환
	// const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

	// 총 날짜 문자열 생성
	// const totalDate = `${differenceInDays + 1}일`;

	// console.log(totalDate);

    function calculateTotalDays(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const differenceInTime = endDate - startDate;
        return `${differenceInTime / (1000 * 60 * 60 * 24) + 1}일`;
    }

    const [ form, setForm ] = useState({
        travelCode: null,
        memberCode: 1,  // 본인 코드 가져와야 함
        travelName: "Title", 
        travelStartDate: startDate,
		travelEndDate: endDate,
		travelTotalDate: "0일",
        travelDestination: "",
        travelOnoff: "N",
        travelIsdeleted: "N"
    })

    const reset = () => {
        setDatePeriod([null, null]);
    };

    useEffect(() => {
        dispatch(callCountryAPI()); // 도시 API 호출
    }, []);

    const formatDateToLocal = (date) => {
        if (!date) return ""; // 날짜가 없는 경우 빈 문자열 반환
        const offset = date.getTimezoneOffset() * 60000; // 로컬 시간대를 보정
        const localDate = new Date(date.getTime() - offset);
        return localDate.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 반환
    };

    useEffect(() => {
        if (startDate && endDate) {
            const totalDate = calculateTotalDays(startDate, endDate);
    
            setForm((prevForm) => ({
                ...prevForm,
                travelStartDate: formatDateToLocal(startDate),
                travelEndDate: formatDateToLocal(endDate),
                travelTotalDate: totalDate,
                travelDestination: selectedCity,
            }));
        }
    }, [startDate, endDate, selectedCity]);

    useEffect(() => {

        dispatch(callCityByCountryCodeAPI(selectedCountry)); // 도시 API 호출

    }, [selectedCountry]);

    const onClickCreateTravelPlanHandler = async () => {
        if (!startDate || !endDate) {
            alert("여행 날짜를 선택해주세요.");
            return;
        }
    
        // const totalDate = calculateTotalDays(startDate, endDate);

        // console.log("totalDate: ", totalDate);

        // const updateForm = {
        //     ...form,
        //     travelStartDate: startDate.toISOString().split("T")[0], // ISO to "YYYY-MM-DD"
        //     travelEndDate: endDate.toISOString().split("T")[0],
        //     travelTotalDate: totalDate,
        // };

        // console.log("onClickCreateTravelPlanHandler form : ", form);

        // API 요청 시 updateForm 사용
        await dispatch(callCreateTravelPlanAPI(form));

        dispatch({ type: SET_FORM, payload: form });

        // 페이지 이동
        // 세부내용을 적는 페이지로 이동.
        // navigate("/plans/AddByDayPlan");

        // 일정 List로 이동
        navigate("/plans/TravelPlan");

    };

    const onClickCancelTravelPlanHandler = () => {
        console.log("[TravelPlanCreate] onClickCancelTravelPlanHandler");
        navigate(-1);
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className='travel-plan-create-container'>
            <h1>여행 일정을 계획해보세요!</h1>
            <div className='travel-plan-create-form'>
            <h2>Step1! 여행의 제목을 지어주세요</h2>
            <label>제목 : <input
                type="text"
                name="travelName"
                placeholder="여행에게 멋진 제목을 지어주세요"
                onChange={onChangeHandler}
                /></label>
            </div>
            <br/>
            <div className='travel-plan-create-form'>
            <h2>Step2! 여행할 국가와 도시를 선택해 주세요</h2>
            <div>
            <label>국가 : </label>
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)} // 국가 선택 시 상태 변경
                    >
                    {countryList.length > 0 ? (
                        countryList.map((country) => (
                            <option 
                            key={country.countryCode} 
                            value={country.countryCode}
                            >
                                {country.countryName}
                            </option>
                        ))
                    ) : (
                        <option disabled>국가 정보가 없습니다.</option>
                    )}
                </select>
            </div>
            <div>
            <label>도시 : </label>
                <select
                    value={selectedCity || ""} // 선택된 도시 상태
                    name="travelDestination"
                    // onChange={onChangeHandler}
                    onChange={(e) => {
                        // console.log("value : ",e.target.value);
                        return setSelectedCity(e.target.value)} // 도시 선택 시 상태 변경
                    }
                    >
                    {cityList.length > 0 ? (
                        cityList.map((city) => (
                            <option 
                            key={city.cityCode} 
                            value={city.cityName}
                            >
                                {city.cityName} 
                            </option>
                        ))
                    ) : (
                        <option disabled>표시할 도시 정보가 없습니다.</option>
                    )}
                </select>
            </div>
                    </div><br/>
                    <div className='travel-plan-create-form'>
                <h2>Step3! 여행 날짜를 선택해 주세요</h2>
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
                <button onClick={reset}
                className='travel-plan-reset-button'>
                    날짜 초기화
                </button>
                <div className='travel-plan-select-info'>
                    <p>여행 시작 : {form.travelStartDate || "미선택"}</p>
                    <p>여행 종료 : {form.travelEndDate || "미선택"} (총 {form.travelTotalDate || "미선택"})</p>
                </div>
            
            </div>

            <div className='travel-plan-create-buttons'>
            <button 
            className='travel-plan-create-save-button'
            onClick={onClickCreateTravelPlanHandler}>추가하기</button>
            <button 
            className='travel-plan-create-cancel-button'
            onClick={onClickCancelTravelPlanHandler}>취소하기</button>
            </div>
        </div>
    );
}