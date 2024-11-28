import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import { callUpdateTravelPlanAPI } from "../../apis/TravelPlanAPICalls";
import { callCountryAPI, callCityByCountryCodeAPI } from '../../apis/AreaAPICalls';
import { useDispatch, useSelector } from "react-redux";
import './TravelPlanUpdate.css';

export default function TravelPlanUpdate() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const countryList = useSelector((state) => state.areaReducer); // 국가 리스트
    const cityList = useSelector((state) => state.cityReducer); // 도시 리스트

    const travelPlan = location.state || {};

    console.log('location.state:', location.state);

    const [form, setForm] = useState({
        travelName: "", 
        travelStartDate: travelPlan.travelStartDate,
        travelEndDate: travelPlan.travelEndDate,
        travelTotalDate: travelPlan.travelTotalDate,
        travelDestination: "",
    });
    const [datePeriod, setDatePeriod] = useState([null, null]);
    const [startDate, endDate] = datePeriod;
    const [selectedCountry, setSelectedCountry] = useState(1); 
    const [selectedCity, setSelectedCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 초기화 버튼 핸들러
    const reset = () => {
        setDatePeriod([null, null]);
    };

    function calculateTotalDays(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const differenceInTime = endDate - startDate;
        return `${differenceInTime / (1000 * 60 * 60 * 24) + 1}일`;
    }

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
        if (travelPlan) {
            setForm({
                // ...travelPlan,
                travelName: travelPlan.travelName || "",
                travelStartDate: travelPlan.travelStartDate || "",
                travelEndDate: travelPlan.travelEndDate || "",
                travelTotalDate: travelPlan.travelTotalDate || "",
                travelDestination: travelPlan.travelDestination || "",
            });
        }
    }, [travelPlan]);

    useEffect(() => {
        // console.log('selectedCountry : ', selectedCountry);

        dispatch(callCountryAPI()); // 국가 API 호출

        dispatch(callCityByCountryCodeAPI(selectedCountry));

    }, [selectedCountry]);

    // useEffect(() => {
    //     // setLoading(true);
    //     dispatch(callCountryAPI()); // 국가 API 호출
    //     // setLoading(false); // 데이터 로딩 완료 시 로딩 상태 해제
    // }, []);

    // useEffect(() => {
    //     console.log('selectedCountry : ', selectedCountry);

    //     dispatch(callCityByCountryCodeAPI(selectedCountry)); // 도시 API 호출

    // }, [selectedCountry]);


    // const onChangeHandler = (e) => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
    
        // name이 undefined거나 비정상적인 값일 경우 대비
        if (!name) {
            console.warn("onChangeHandler: name이 유효하지 않습니다.");
            return;
        }
    
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value || "", // value가 undefined일 경우 빈 문자열로 처리
        }));
    };


    const onClickSaveHandler = async () => {
        
        try {
            setLoading(true);
            const updatedTravelPlan = {
                ...travelPlan,
                travelCode: travelPlan.travelCode,
                memberCode: travelPlan.memberCode,
                travelName: form.travelName, 
                travelStartDate: form.travelStartDate,
                travelEndDate: form.travelEndDate,
                travelTotalDate: form.travelTotalDate,
                travelDestination: selectedCity,
                travelOnoff: 'N',
                travelIsdeleted: 'N',
            };

            await dispatch(callUpdateTravelPlanAPI(updatedTravelPlan));
            alert("여행 계획이 성공적으로 수정되었습니다.");
            // navigate(`/plans/${travelPlan.travelCode}`, { replace: true });
            navigate(`/plans/TravelPlan`, { replace: true });
        } catch (err) {
            console.error("Error updating TravelPlan: ", err);
            setError("여행 계획 수정 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // console.log(startDate, endDate);

    const formatDate = (date) => {
        if (!date) return "";
        return date.toLocaleDateString("ko-KR"); // 한국 표준시 기준 날짜 반환
    };

    const onClickCancelHandler = () => {
        if (window.confirm("수정을 취소하시겠습니까? 변경사항은 저장되지 않습니다.")) {
            navigate(-1);
        }
    };

    return (
        <div className="travel-plan-update-container">
            <h1>여행 일정 수정</h1>
            <div className="travel-plan-update-form">
                <h2>제목 수정</h2>
            <label>
                제목: 
                <input
                    placeholder="제목"
                    name="travelName"
                    onChange={onChangeHandler}
                    value={form.travelName || ""}
                />
            </label>
            </div>

            <div className="travel-plan-update-form">
                <h2>국가 및 도시 수정</h2>
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

            {/* 도시 리스트 */}
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
            </div>

            <div className="travel-plan-update-form">
                <h2>날짜 수정</h2>
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(update) => {
                            setDatePeriod(update); 
                            setForm({
                                ...form,
                                travelStartDate: update[0] ? formatDate(update[0]) : "",
                                travelEndDate: update[1] ? formatDate(update[1]) : "",
                            });
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        placeholderText="시작일과 종료일 선택"
                        dateFormat="yyyy/MM/dd"
                        minDate={new Date()}
                    />
                </div>
                <button 
                className="travel-plan-reset-button"
                onClick={reset}>날짜 초기화</button>

                <div className='travel-plan-select-info'>
                    <p>여행 시작 : {form.travelStartDate || "미선택"}</p>
                    <p>여행 종료 : {form.travelEndDate || "미선택"} (총 {form.travelTotalDate || "미선택"})</p>
                </div>
            </div>

            <div className="travel-plan-update-buttons">
            <button 
            className="travel-plan-update-save-button"
            onClick={onClickSaveHandler} disabled={loading}>
                {loading ? "저장 중..." : "수정하기"}
            </button>
            <button 
            className="travel-plan-update-cancel-button"
            onClick={onClickCancelHandler} disabled={loading}>
                취소하기
            </button>
            </div>
        </div>
    );
}