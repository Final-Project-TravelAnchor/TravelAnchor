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

    // console.log('location.state:', location.state);

    const [form, setForm] = useState({
        travelName: "", 
        travelStartDate: "",
        travelEndDate: "",
        travelTotalDate: "",
        travelDestination: "",
    });
    const [datePeriod, setDatePeriod] = useState([null, null]);
    const [startDate, endDate] = datePeriod;
    const [selectedCountry, setSelectedCountry] = useState(""); 
    const [selectedCity, setSelectedCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 초기화 버튼 핸들러
    const reset = () => {
        setDatePeriod([null, null]);
    };

    // 시작일과 종료일을 Date 객체로 변환
	const start = new Date(startDate);
	const end = new Date(endDate);
	// 날짜 차이 계산 (밀리초 기준)
	const differenceInTime = end - start;
	// 밀리초를 일 단위로 변환
	const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
	// 총 날짜 문자열 생성
	const totalDate = `${differenceInDays + 1}일`;
	// console.log(totalDate);

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
                travelTotalDate: totalDate,
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
        <div>
            <h1>여행일정 수정하기</h1>
            {loading && <p>수정 중입니다... 잠시만 기다려주세요.</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <label>
                제목: 
                <input
                    placeholder="제목"
                    name="travelName"
                    onChange={onChangeHandler}
                    value={form.travelName || ""}
                />
            </label>

            <div>
                <h3>여행 날짜를 선택해 주세요</h3>
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

            <button onClick={reset}>초기화</button>

            <div className="country-group">
                <label>국가</label>
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)} // 국가 선택 시 상태 변경
                >
                    {countryList.length > 0 && countryList.map((country) => (
                        <option 
                        key={country.countryCode} 
                        value={country.countryCode}
                        >
                        {country.countryName}
                        </option>
                    ))}
                </select>
            </div>

            {/* 도시 리스트 */}
            <div>
                <h3>도시</h3>
                <ul className="city-list"> 
                {cityList.length > 0 ? (
                    cityList.map((city) => (
                        <li
                        key={city.cityCode}
                        onClick={() => setSelectedCity(city.cityName)}
                        className={`city-item ${selectedCity === city.cityName ? "active" : ""}`}
                        >
                        {city.cityName} ({city.cityCode})
                        </li>
                    ))
                ) : (
                <p>표시할 도시 정보가 없습니다.</p>
                )}
                </ul>
            </div>


            <button onClick={onClickSaveHandler} disabled={loading}>
                {loading ? "저장 중..." : "수정하기"}
            </button>
            <button onClick={onClickCancelHandler} disabled={loading}>
                취소하기
            </button>
        </div>
    );
}