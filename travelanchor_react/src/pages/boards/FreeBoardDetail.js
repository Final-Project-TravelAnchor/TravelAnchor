import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FreeBoard from "./FreeBoard";
import { decodeJwt } from "../../utils/tokenUtils";
import { callGetMemberAPI } from "../../apis/MemberAPICalls";
import { findSub } from "../../utils/tokenUtils";
import './FreeBoardDetail.css';

export default function FreeBoardDetail() {

    const location = useLocation();
    const freeboard = location.state;

    // console.log("freeboard: " , freeboard);

    const userInfo = useSelector(state => state.memberReducer);
    const userMembercode = userInfo.data;

    // console.log(freeboard.memberCode);
    // console.log(userMembercode);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const population = useSelector(state => state.populationReducer)
    // const populationDetail = population.data;
    // console.log(populationDetail);

    const onClickModifyModeHandler = (freeboard) => {
        console.log("[FreeBoardDetail]onClickModifyModeHandler ", freeboard);
        navigate(`/freeboard/freeboardModify/${freeboard.freeboardCode}`, { state: freeboard, replace: false });
    };

    const onClickBackHandler = () => {
        navigate(`/freeboard`);
    }

    useEffect(() => {
        console.log("[FreeBoardDetail] freeboard useEffect");

        // const tokenSub = findSub();

        // // console.log(tokenSub);

        // if(tokenSub) {
        //     dispatch(callGetMemberAPI({memberId: tokenSub}));
        // }

        // dispatch(callPopulationDetailAPI(populationCode));
    }, []);

    return (
        <div className="free-board-detail-container">
            <div>
                {
                    freeboard ? 
                    (
                        <div className="free-board-detail-content">
                            <h1 className="free-board-detail-title">{freeboard.freeBoardTitle}</h1>
                            <div className="fb-detail-in-container">
                                <h3>작성일 : {freeboard.freeBoardCreatedAt}</h3>
                                <div  className="fb-detail-in-text">
                                <h3>{freeboard.freeBoardContent}</h3>
                                </div>
            <div className="fb-button-container">
                {/* {
                    userMembercode && userMembercode.memberCode === freeboard.memberCode ?
                    (
                        <button onClick={() => onClickModifyModeHandler(freeboard)}>
                            수정하기
                        </button>
                    )
                    :
                    (
                        null
                    )
                } */}
                <button 
                className="fb-detail-update-button"
                onClick={() => onClickModifyModeHandler(freeboard)}>
                            수정하기
                        </button>
                        <button 
                className="fb-detail-back-button"
                onClick={() => onClickBackHandler()}>
                            뒤로가기
                        </button>
            </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <p>게시글 데이터를 불러오는 중입니다...</p>
                    )
                }
            </div>
        </div>
    );
}