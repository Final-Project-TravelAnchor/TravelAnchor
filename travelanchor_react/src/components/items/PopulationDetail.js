import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { callPopulationDetailAPI } from "../../apis/PopulationAPICalls";
import './PopulationDetail.css';
import { isLogin } from "../../utils/tokenUtils";



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

        // isLogin이 false이면 로그인 창으로 이동
        if(!isLogin()) {
			navigate("/login", { replace: false });
            return;
        }

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

    const onClickBackPopulationHandler = () => {
        console.log("[PopulationDetail] onClickBackPopulationHandler");
        navigate(`/items/population`);
    };

    return (
        <div className="detail-mate-container">
            <h1 className="detail-title">여행메이트 찾기</h1>

    <div className="detail-container">
        {population && (
            <div className="detail-content">
                <h2 className="mate-detail-title">
                    {population.populationTitle}
                </h2>
                <h2 className="detail-item">
                    <span className="detail-label">생성일자:</span> {population.populationCreatedAt}
                </h2>
                <h2 className="detail-item">
                    <span className="detail-label">조회수:</span> {population.populationViews}
                </h2>
                <h2 className="detail-item">
                    <span className="detail-label">모집인원:</span> {population.populationPeople}
                </h2>
                <h2 className="detail-item">
                    <span className="detail-label">내용:</span> {population.populationDescription}
                </h2>
                <button onClick={onClickInsertChatRoom} className="detail-chat-button">
            채팅하기
        </button>
            </div>
        )}
        <div className="mate-detail-button-container">
            <button
                onClick={() => onClickModifyModeHandler(populationCode, population)}
                className="mate-detail-modify-button"
            >
                수정하기
            </button>
            <button onClick={onClickBackPopulationHandler}
                    className="mate-detail-back-button">뒤로가기</button>
        </div>
        
    </div>
    </div>
    );
}