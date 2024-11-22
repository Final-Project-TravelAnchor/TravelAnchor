import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callUpdatePopulationAPI } from "../../apis/PopulationAPICalls";
import { useDispatch } from "react-redux";
import './PopulationModify.css';


export default function PopulationModify() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log(location.state);
    const { population } = location.state || {};
    console.log("[PopulationModify] population: " + population);

    const [ form, setForm ] = useState({});

    const onChangeHanlder = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log(e.target.name + " : " + e.target.value);
    };

    // 저장
    const onClickSaveHandler = (e) => {
        const updatedPopulation = {
            ...population,
            populationTitle: form.populationTitle,
            populationDescription: form.populationDescription,
            populationOnoff: form.populationOnoff,
            populationCreatedAt: '2024-03-09',
        };

        dispatch(callUpdatePopulationAPI(updatedPopulation));
        navigate(`/items/population`, { replace: false});
    };

    // 취소
    const onClickCancelHandler = () => {
        console.log("[PopulationModify] onClickCancelHandler");
        navigate(`/items/${population.populationCode}`, { replace: false});
    };

    return (
        <div className="mate-modify-container">
        <h1 className="mate-modify-title">여행메이트 찾기 수정</h1>
        <div className="mate-modify-form">
            <label className="mate-modify-label">
                제목
            </label>
                <input
                    className="mate-modify-title-input"
                    placeholder="제목"
                    name="populationTitle"
                    onChange={onChangeHanlder}
                    value={form.populationTitle}
                /><br/>
            <label className="mate-modify-label">
                설명
            </label>
                <input
                    className="mate-modify-content-input"
                    placeholder="설명"
                    name="populationDescription"
                    onChange={onChangeHanlder}
                    value={form.populationDescription}
                /><br/>
            <label className="mate-modify-label">
                여행 상태
            </label>
                <select
                    className="mate-modify-select"
                    name="populationOnoff"
                    onChange={onChangeHanlder}
                    value={form.populationOnoff}
                >
                    <option value="Y">여행진행</option>
                    <option value="N">여행종료</option>
                </select>
            <div className="mate-modify-button-container">
                <button
                    className="mate-modify-save-button"
                    onClick={onClickSaveHandler}
                >
                    수정하기
                </button>
                <button
                    className="mate-modify-cancel-button"
                    onClick={onClickCancelHandler}
                >
                    취소하기
                </button>
            </div>
        </div>
    </div>
    );
}