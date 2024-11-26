import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callCountryAPI, callCityByCountryCodeAPI, callCityAPI, callCountryByCountryCodeAPI } from '../../apis/AreaAPICalls';
import "./AddReportDestination.css";
import {SET_SELECTED_CITY} from '../../modules/CityModule';

function AddReportDestination () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countryList = useSelector((state) => state.areaReducer); // 국가 리스트
    const cityList = useSelector((state) => state.cityReducer); // 도시 리스트
    console.log("countryList : ", countryList); // 국가 리스트 콘솔 출력
    console.log("cityList : ", cityList); // 국가 리스트 콘솔 출력

    const [selectedCountry, setSelectedCountry] = useState(1); // 국가 코드로 초기값 설정
    const [selectedCity, setSelectedCity] = useState("");

    // 다음 페이지 이동 핸들러
    const nextPage = () => {
        if (setSelectedCity) {
            dispatch({
                type: SET_SELECTED_CITY,
                payload: {
                selectedCity: selectedCity
                }
            });
            console.log("nextPage");
        // 도시가 선택되었을 때만 이동
            navigate('/travelReport/TravelReportCreate');
        } else {
        alert('여행한 도시를 선택해주세요..');
        }
    };
    

    useEffect(() => {
        // setLoading(true);
        dispatch(callCountryAPI()); // 도시 API 호출
        // setLoading(false); // 데이터 로딩 완료 시 로딩 상태 해제
    }, []);

    useEffect(() => {
        console.log('selectedCountry : ', selectedCountry);

        dispatch(callCityByCountryCodeAPI(selectedCountry)); // 도시 API 호출

    }, [selectedCountry]);


    // 국가 선택에 맞는 도시 필터링
    // const filteredCity = destinationList.filter(
    //     (city) => city.countryCode === selectedCountry
    // );


    return (
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

            {/* 다음 페이지 이동 버튼 */}
            <div>
            <button onClick={nextPage}>
            &gt; {/* ">" 표시 */}
            </button>
            </div>
        </div>
    );
}

export default AddReportDestination;
