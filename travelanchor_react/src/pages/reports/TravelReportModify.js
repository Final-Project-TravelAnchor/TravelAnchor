import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import { callUpdateTravelReportAPI } from "../../apis/TravelReportAPICalls";
import { callCityByCountryCodeAPI, callCountryAPI } from '../../apis/AreaAPICalls';
import { useDispatch, useSelector } from "react-redux";

export default function TravelReportModify() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const countryList = useSelector((state) => state.areaReducer); // 국가 리스트
    const cityList = useSelector((state) => state.cityReducer); // 도시 리스트

    const travelReport = location.state || {};
    const [form, setForm] = useState({
        reportTitle: "",
        reportContent: "",
        // reportStartDate: "",
        // reportEndDate: "",
        reportDestination: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [datePeriod, setDatePeriod] = useState([null, null]);
    const [startDate, endDate] = datePeriod;

    const [selectedCountry, setSelectedCountry] = useState(""); 
    const [selectedCity, setSelectedCity] = useState("");

    // 선택된 날짜 초기화 핸들러
    const reset = () => {
        setDatePeriod([null, null]);
    };

    const formatDate = (date) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`; // YYYY-MM-DD 형식 반환
    };

    // const nextPage = () => {
    //     if (startDate && endDate) {
    //         dispatch({
    //             type: SET_DATE_PERIOD,
    //             payload: {
    //                 startDate: startDate.toISOString(),
    //                 endDate: endDate.toISOString(),
    //                 }
    //             });
    //         console.log("nextPage");
    //     // 날짜가 모두 선택되었을 때만 이동
    //         navigate('/AddReportDestination');
    //     } else {
    //     alert('시작일과 종료일을 모두 선택해주세요.');
    //     }
    // };

    useEffect(() => {
        if (travelReport) {
            setForm({
                reportTitle: travelReport.reportTitle || "",
                reportContent: travelReport.reportContent || "",
                reportStartDate: travelReport.reportStartDate || "",
                reportEndDate: travelReport.reportEndDate || "",
                reportDestination: travelReport.reportDestination || "",
            });
        }
    }, [travelReport]);

    console.log("travelReport 이거이거 " + travelReport);

    useEffect(() => {
        console.log('selectedCountry : ', selectedCountry);

        dispatch(callCountryAPI()); // 도시 API 호출
        dispatch(callCityByCountryCodeAPI(selectedCountry)); 

    }, [selectedCountry]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickSaveHandler = async () => {
        if (!form.reportTitle.trim() || !form.reportContent.trim()) {
            alert("제목과 설명을 모두 입력해주세요.");
            return;
        }

        const updatedTravelReport = {
            ...travelReport,
            reportCode: travelReport.reportCode,
            memberCode: travelReport.memberCode,
            reportTitle: form.reportTitle, 
            reportContent: form.reportContent,
            reportStartDate: form.reportStartDate,
            reportEndDate: form.reportEndDate,
            reportDestination: selectedCity,
            reportCreatedAt: travelReport.reportCreatedAt,
            reportIsdeleted: 'N',
        };

        try {
            setLoading(true);
            setError(null);
            console.log("updatedTravelReport : ", updatedTravelReport);

            await dispatch(callUpdateTravelReportAPI(updatedTravelReport));
            alert("게시글이 성공적으로 수정되었습니다.");
            console.log("이게 맞는지 보여주세묘 : " + travelReport.reportCode);
            // navigate(`/travelReport/${travelReport.reportCode}`, { replace: true });
            navigate(`/travelReport`, { replace: true });
            // window.location.reload(); // 페이지 새로고침
        } catch (err) {
            console.error("Error updating TravelReport: ", err);
            setError("게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    const onClickCancelHandler = () => {
        if (window.confirm("수정을 취소하시겠습니까? 변경사항은 저장되지 않습니다.")) {
            navigate(-1);
        }
    };

    return (
    <div>
        <div>
            <h1>~ 수정하기 ~</h1>
            </div>
            <div>
                {loading && <p>수정 중입니다... 잠시만 기다려주세요.</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <label>
                    제목:{" "}
                    <input
                        placeholder="제목"
                        name="reportTitle"
                        onChange={onChangeHandler}
                        value={form.reportTitle}
                    />
                </label>
                <br />
                <label>
                    내용:{" "}
                    <input
                        placeholder="설명"
                        name="reportContent"
                        onChange={onChangeHandler}
                        value={form.reportContent}
                    />
                </label>
            </div>

            <div>
                <h3>여행 날짜를 선택해 주세요</h3>
                <DatePicker
                    selected={startDate}
                    onChange={(update) => {
                        setDatePeriod(update); 
                        setForm({
                            ...form,
                            reportStartDate: update[0] ? formatDate(update[0]) : "",
                            reportEndDate: update[1] ? formatDate(update[1]) : "",
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

                {/* 버튼 */}
                <div>
                    {/* 초기화 버튼 */}
                    <button onClick={reset}>
                    초기화
                    </button>
                </div>

            <div className="container">
            {/* 국가 리스트 */}
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
        </div>

            <div>
                <br />
                <button onClick={onClickSaveHandler} disabled={loading}>
                    {loading ? "저장 중..." : "수정하기"}
                </button>
                <button onClick={onClickCancelHandler} disabled={loading}>
                    취소하기
                </button>
            </div>
    </div>
    );
}
