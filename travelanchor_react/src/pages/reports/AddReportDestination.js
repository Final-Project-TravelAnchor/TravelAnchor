import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callCountryAPI, callCityByCountryCodeAPI, callCityAPI, callCountryByCountryCodeAPI } from '../../apis/AreaAPICalls';
import "./AddReportDestination.css";

function AddReportDestination () {
    const dispatch = useDispatch();
    const countryList = useSelector((state) => state.areaReducer); // 국가 리스트
    const cityList = useSelector((state) => state.cityReducer); // 도시 리스트
    console.log("countryList : ", countryList); // 국가 리스트 콘솔 출력
    console.log("cityList : ", cityList); // 국가 리스트 콘솔 출력

    const [loading, setLoading] = useState(true);
    const themes = ["휴양", "관광", "쇼핑", "맛집", "배낭여행", "액티비티", "세계여행"];
    const [selectedCountry, setSelectedCountry] = useState(1); // 국가 코드로 초기값 설정
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("휴양");

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

            {/* 테마 리스트 */}
            {/* <div>
                <h3>여행 테마</h3>
                <ul>
                    {themes.map((theme) => (
                        <li
                            key={theme}
                            onClick={() => setSelectedTheme(theme)}
                            style={{
                                cursor: "pointer",
                                background: selectedTheme === theme ? "orange" : "white",
                                color: selectedTheme === theme ? "white" : "black",
                                padding: "10px",
                            }}
                        >
                            {theme}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
}

export default AddReportDestination;
