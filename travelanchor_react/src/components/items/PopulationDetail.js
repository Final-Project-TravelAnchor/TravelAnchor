import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { callPopulationDetailAPI } from "../../apis/PopulationAPICalls";


export default function PopulationDetail() {

    const { populationCode } = useParams();
    console.log("[PopulationDetail] population code: " + populationCode);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const population = useSelector(state => state.populationReducer)
    // const populationDetail = population.data;
    // console.log(populationDetail);

    const onClickModifyModeHandler = (populationCode, population) => {
        console.log("[PopulationDetail]onClickModifyModeHandler ", populationCode);
        console.log("[PopulationDetail]onClickModifyModeHandler ", population);
        navigate(`/items/populationModify/${populationCode}`, { state: {population}, replace: false });
        // navigate(`/items/${populationCode}`, { replace: false});
    };

    const onClickInsertChatRoom = () => {
        console.log("[PopulationDetail] onClickInsertChatRoom");
        navigate(`/items/chatroom/${populationCode}`);
    };

    useEffect(() => {
        console.log("[PopulationDetail] useEffect");
        dispatch(callPopulationDetailAPI(populationCode));
    }, []);

    useEffect(() => {
        console.log("[PopulationDetail] population useEffect");
        // dispatch(callPopulationDetailAPI(populationCode));
    }, [population]);

    return (
        <div>
            <button onClick={() => onClickModifyModeHandler(populationCode, population)}>
                수정하기
            </button>
            {
                population && 
                (
                    <>
                        <h1>제목 : {population.populationTitle}</h1>
                        <h2>생성일자 : {population.populationCreatedAt}</h2>
                        <h2>조회수 : {population.populationViews}</h2>
                    </>
                )
            }
            <button onClick={onClickInsertChatRoom}>
                채팅하기
            </button>
        </div>
    );
}