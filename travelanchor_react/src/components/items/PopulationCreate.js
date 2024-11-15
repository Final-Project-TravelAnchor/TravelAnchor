import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, replace, useNavigate, useParams } from "react-router-dom";
import { callCreatePopulationAPI } from "../../apis/PopulationAPICalls";


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


    return (
        <div>
            <h1>PopulationCreate page</h1>
            <label>공고 제목 : <input
                type="text"
                name="populationTitle"
                placeholder="공고 제목"
                onChange={onChangeHandler}
            /></label>
            <br/>
            <label>공고 설명 : <input
                type="text"
                name="populationDescription"
                placeholder="공고 설명"
                onChange={onChangeHandler}
            /></label>
            <br/>
            <label>공고 모집인원 : <input
                type="text"
                name="populationPeople"
                placeholder="공고 모집인원"
                onChange={onChangeHandler}
            /></label>
            <br/>
            <button onClick={onClickCreatePopulationHandler}>추가하기</button>
            <button>취소하기</button>
        </div>
    );
}