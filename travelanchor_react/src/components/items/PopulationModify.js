import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callUpdatePopulationAPI } from "../../apis/PopulationAPICalls";
import { useDispatch } from "react-redux";


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
            populationOnoff: 'Y',
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
        <>
            <div>
                <h1>Population Modify Page</h1>
            </div>
            <div>
                <label>제목 : <input
                    placeholder="제목"
                    name="populationTitle"
                    onChange={ onChangeHanlder }
                    value={form.populationTitle}
                /></label>
                <br/>
                <label>설명 : <input
                    placeholder="설명"
                    name="populationDescription"
                    onChange={ onChangeHanlder }
                    value={form.populationDescription}
                /></label>
                <br/>
                <label>여행 상태:
                    <select
                        name="populationOnoff"
                        onChange={onChangeHanlder}
                        value={form.populationOnoff}
                    >
                        <option value="진행중">여행진행</option>
                        <option value="종료">여행종료</option>
                    </select>
                </label>
                <br/>
                <button onClick={onClickSaveHandler}>수정하기</button>
                <button onClick={onClickCancelHandler}>취소하기</button>
            </div>
        </>
    );
}