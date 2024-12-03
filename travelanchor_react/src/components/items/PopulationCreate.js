import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callCreatePopulationAPI } from "../../apis/PopulationAPICalls";
import { callCountryAPI, callCityByCountryCodeAPI } from '../../apis/AreaAPICalls';
import './PopulationCreate.css';

export default function PopulationCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const countryList = useSelector((state) => state.areaReducer); // 국가 리스트
    const cityList = useSelector((state) => state.cityReducer); // 도시 리스트
    const [selectedCountry, setSelectedCountry] = useState(null); // 선택한 국가 코드
    const [selectedCity, setSelectedCity] = useState(null); // 선택한 도시 코드
    const [loading, setLoading] = useState(false); // 로딩 상태 관리

    const today = new Date().toISOString().split('T')[0];

    const [form, setForm] = useState({
        populationCode: null,
        travelCode: null,
        memberCode: 1, // 만드는 회원의 코드를 가져와야 함
        countryCode: null,
        populationTitle: null,
        populationDescription: null,
        populationCreatedAt: today,
        populationViews: 0,
        populationPeople: null,
        populationOnoff: "Y",
    });

    // 국가 목록 API 호출
    useEffect(() => {
        dispatch(callCountryAPI());
    }, [dispatch]);

    // 국가 선택 시 도시 목록 API 호출
    useEffect(() => {
        if (selectedCountry) {
            dispatch(callCityByCountryCodeAPI(selectedCountry));
        }
    }, [selectedCountry, dispatch]);

    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            countryCode: selectedCountry,
            travelCode: selectedCity,
        }));
    }, [selectedCountry, selectedCity]);

    // 국가/도시 기본값 설정
    useEffect(() => {
        if (countryList.length > 0) {
            setSelectedCountry(countryList[0].countryCode);
        }
    }, [countryList]);

    useEffect(() => {
        if (cityList.length > 0) {
            setSelectedCity(cityList[0].cityCode);
        }
    }, [cityList]);

    const onClickCreatePopulationHandler = async () => {
        setLoading(true);
        try {
            console.log("Form Data:", form);
            await dispatch(callCreatePopulationAPI(form));
            navigate("/items/population");
        } catch (error) {
            console.error("Failed to create population:", error);
        } finally {
            setLoading(false);
        }
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickCancelPopulationHandler = () => {
        navigate("/items/population");
    };

    return (
        <div className="mate-create-container">
            <h1 className="mate-create-title">여행메이트 모집공고 작성</h1>
            {loading ? (
                <p>로딩 중...</p>
            ) : (
                <div className="mate-create-form">
                    <label className="mate-create-label">제목</label>
                    <input
                        className="mate-create-title-input"
                        type="text"
                        name="populationTitle"
                        placeholder="제목을 입력하세요"
                        onChange={onChangeHandler}
                    />
                    <br />
                    <div className="mate-create-content-div">
                    <label className="mate-create-label">내용</label>
                    <textarea
                        className="mate-create-content-input"
                        type="text"
                        name="populationDescription"
                        placeholder="내용을 입력하세요"
                        onChange={onChangeHandler}
                    />
                    </div>
                    <br />

                    <div className="country-group">
                        <label className="mate-create-label">국가</label>
                        <select
                            className="mate-create-country"
                            value={selectedCountry || ""}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                            {countryList.map((country) => (
                                <option key={country.countryCode} value={country.countryCode}>
                                    {country.countryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mate-create-label">도시</label>
                        <select 
                            className="mate-create-city"
                            value={selectedCity || ""}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        >
                            {cityList.map((city) => (
                                <option key={city.cityCode} value={city.cityCode}>
                                    {city.cityName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <label className="mate-create-label">모집인원</label>
                    <input
                        className="mate-create-people-input"
                        type="number"
                        name="populationPeople"
                        placeholder="공고 모집인원"
                        onChange={onChangeHandler}
                        defaultValue={2}
                    />
                    <br />

                    <div className="mate-create-button-container">
                        <button
                            onClick={onClickCreatePopulationHandler}
                            className="mate-create-save-button"
                        >
                            추가하기
                        </button>
                        <button
                            onClick={onClickCancelPopulationHandler}
                            className="mate-create-cancel-button"
                        >
                            취소하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}