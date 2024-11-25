import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, replace, useNavigate, useParams } from "react-router-dom";
import { callCreatePopulationAPI } from "../../apis/PopulationAPICalls";
import './PopulationCreate.css';
import { callCountryAPI, callCityByCountryCodeAPI, callCityAPI, callCountryByCountryCodeAPI } from '../../apis/AreaAPICalls';


export default function PopulationCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const countryList = useSelector((state) => state.areaReducer); // 국가 리스트
    const cityList = useSelector((state) => state.cityReducer); // 도시 리스트
    const [selectedCountry, setSelectedCountry] = useState(1); // 국가 코드로 초기값 설정
    const [selectedCity, setSelectedCity] = useState("");

    console.log("countryList:", countryList);
    console.log("cityList:", cityList);

    const today = new Date().toISOString().split('T')[0];
    // console.log(today);

    const [ form, setForm ] = useState({
        populationCode: null,
        travelCode: selectedCity,  // 이건 국가 코드 가져와야 함.
        memberCode: 1, // 만드는 회원의 코드를 가져와야 함
        countryCode: selectedCountry,
        populationTitle: null,
        populationDescription: null,
        populationCreatedAt: today,
        populationViews: 0,
        populationPeople: null,
        populationOnoff: "Y",
    })

    useEffect(() => {
        console.log('selectedCountry : ', selectedCountry);

        dispatch(callCityByCountryCodeAPI(selectedCountry)); // 도시 API 호출

    }, [selectedCountry]);

    useEffect( () => {
        // 국가 TBL에 접근할 dispatch 구현하기

        dispatch(callCountryAPI());

        // dispatch(call)
    }, []);

    const onClickCreatePopulationHandler = async () => {

        console.log('onClickCreatePopulationHandler', selectedCity);
        console.log('onClickCreatePopulationHandler', selectedCountry);

        console.log("[PopulationCreate] onClickCreatePopulationClickCreate");

        // form 값으로 API 요청
        await dispatch(callCreatePopulationAPI(form));

        navigate(`/items/population`);

    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickCancelPopulationHandler = () => {
        console.log("[PopulationCreate] onClickCancelPopulationHandler");
        navigate(`/items/population`);
    };


    return (
        <div className="mate-create-container">
            <h1 className="mate-create-title">여행메이트 모집공고 작성</h1>
            <div className="mate-create-form">

                <label className="mate-create-label">제목</label>
                    <input
                    className="mate-create-title-input"
                    type="text"
                    name="populationTitle"
                    placeholder="제목을 입력하세요"
                    onChange={onChangeHandler}
                    />
                <br/>
                <label className="mate-create-label">내용</label>
                    <input
                    className="mate-create-content-input"
                    type="text"
                    name="populationDescription"
                    placeholder="내용을 입력하세요"
                    onChange={onChangeHandler}
                    />
                <br/>

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
                    <label>도시</label>
                    <select 
                        className="city-list"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)} // 국가 선택 시 상태 변경
                        >
                        {cityList.length > 0 ? (
                            cityList.map((city) => (
                                <option 
                                key={city.cityCode} 
                                value={city.cityCode}
                                >
                                {city.cityName}
                                </option>
                            ))
                        ) : (
                        <p>표시할 도시 정보가 없습니다.</p>
                        )}
                    </select>
                </div>

                <label className="mate-create-label">모집인원
                </label>
                    <input
                    className="mate-create-people-input"
                    type="text"
                    name="populationPeople"
                    placeholder="공고 모집인원"
                    onChange={onChangeHandler}
                    />
                <br/>


                <div className="mate-create-button-container">
                    <button onClick={onClickCreatePopulationHandler}
                    className="mate-create-save-button">추가하기</button>
                    <button onClick={onClickCancelPopulationHandler}
                    className="mate-create-cancel-button">취소하기</button>
                </div>
            </div>
        </div>
    );
}