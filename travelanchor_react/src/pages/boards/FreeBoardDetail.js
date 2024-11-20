import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FreeBoard from "./FreeBoard";


export default function FreeBoardDetail() {

    const location = useLocation();
    const freeboard = location.state;
    console.log(freeboard);

    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const population = useSelector(state => state.populationReducer)
    // const populationDetail = population.data;
    // console.log(populationDetail);

    const onClickModifyModeHandler = (freeboard) => {
        console.log("[FreeBoardDetail]onClickModifyModeHandler ", freeboard);
        navigate(`/freeboard/freeboardModify/${freeboard.freeboardCode}`, { state: freeboard, replace: false });
    };

    useEffect(() => {
        console.log("[FreeBoardDetail] freeboard useEffect");
        // dispatch(callPopulationDetailAPI(populationCode));
    }, []);

    return (
        <div>
            <button onClick={() => onClickModifyModeHandler(freeboard)}>
                수정하기
            </button>
            {
                freeboard && 
                (
                    <>
                        <h1>제목 : {freeboard.freeBoardTitle}</h1>
                        <h2>생성일자 : {freeboard.freeBoardCreatedAt}</h2>
                        <h3>내용 : {freeboard.freeBoardContent}</h3>
                    </>
                )
            }
        </div>
    );
}