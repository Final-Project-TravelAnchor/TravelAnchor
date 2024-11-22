import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, replace, useNavigate, useParams } from "react-router-dom";
import { callCreatePopulationAPI } from "../../apis/PopulationAPICalls";
import './PopulationCreate.css';


export default function PopulationCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0];
    // console.log(today);

    const [ form, setForm ] = useState({
        populationCode: null,
        travelCode: 1,  // 이건 국가 코드 가져와야 함.
        memberCode: 1, // 만드는 회원의 코드를 가져와야 함
        countryCode: 1,
        populationTitle: null,
        populationDescription: null,
        populationCreatedAt: today,
        populationViews: 0,
        populationPeople: null,
        populationOnoff: "Y",
    })

    useEffect( () => {
        // 국가 TBL에 접근할 dispatch 구현하기
        // dispatch(call)
    }, []);

    const onClickCreatePopulationHandler = async () => {
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