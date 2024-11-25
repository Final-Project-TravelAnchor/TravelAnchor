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
                }
            </div>
            <div>
                {
                    freeboard ? 
                    (
                        <div className="free-board-detail-content">
                            <h1>{freeboard.freeBoardTitle}</h1>
                            <h3>생성일자 : {freeboard.freeBoardCreatedAt}</h3>
                            <h3>내용 : {freeboard.freeBoardContent}</h3>
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