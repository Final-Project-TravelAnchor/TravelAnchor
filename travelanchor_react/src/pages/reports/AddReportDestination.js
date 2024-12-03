import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callCountryAPI, callCityByCountryCodeAPI, callCityAPI, callCountryByCountryCodeAPI } from '../../apis/AreaAPICalls';
import "./AddReportDestination.css";
import { SET_SELECTED_CITY } from '../../modules/CityModule';

function AddReportDestination() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countryList = useSelector((state) => state.areaReducer); // 국가 리스트
    const cityList = useSelector((state) => state.cityReducer); // 도시 리스트
    console.log("countryList : ", countryList);
    console.log("cityList : ", cityList);

    const [selectedCountry, setSelectedCountry] = useState(1);
    const [selectedCity, setSelectedCity] = useState("");

    // 다음 페이지 이동 핸들러
    const nextPage = () => {
        if (selectedCity) {
            dispatch({
                type: SET_SELECTED_CITY,
                payload: {
                    selectedCity: selectedCity
                }
            });
            console.log("nextPage");
            navigate('/travelReport/TravelReportCreate');
        } else {
            alert('여행한 도시를 선택해주세요.');
        }
    };

    useEffect(() => {
        dispatch(callCountryAPI());
    }, []);

    useEffect(() => {
        console.log('selectedCountry : ', selectedCountry);
        dispatch(callCityByCountryCodeAPI(selectedCountry));
    }, [selectedCountry]);

    return (
        <div className="report-container-country-kkokko">
            {/* 국가 리스트 */}
            <div className="report-country-group">
                <label>국가</label> <br />
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    {countryList.length > 0 &&
                        countryList.map((country) => (
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
            <div className="report-city-container">
                <label>도시</label> <br />
                <ul className="report-city-list">
                    {cityList.length > 0 ? (
                        cityList.map((city) => (
                            <li
                                key={city.cityCode}
                                onClick={() => setSelectedCity(city.cityName)}
                                className={`report-city-item ${selectedCity === city.cityName ? "report-active" : ""}`}
                            >
                                {city.cityName} ({city.cityCode})
                            </li>
                        ))
                    ) : (
                        <p>표시할 도시 정보가 없습니다.</p>
                    )}
                </ul>
            </div>

            
        <div>
            {/* 다음 페이지 이동 버튼 */}
            <button onClick={nextPage} className="report-nextButton">
                &gt;
            </button>
        </div>
        </div>

    );
}

export default AddReportDestination;
