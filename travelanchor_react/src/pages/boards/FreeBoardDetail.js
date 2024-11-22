import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FreeBoard from "./FreeBoard";
import { decodeJwt } from "../../utils/tokenUtils";
import { callGetMemberAPI } from "../../apis/MemberAPICalls";


export default function FreeBoardDetail() {

    const location = useLocation();
    const freeboard = location.state;

    const userInfo = useSelector(state => state.memberReducer);
    const userMembercode = userInfo.data;

    console.log(freeboard.memberCode);
    console.log(userMembercode.memberCode);

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

        let tokenSub = decodeJwt(window.localStorage.getItem("accessToken"));

        dispatch(callGetMemberAPI({memberId: tokenSub.sub}));

        // dispatch(callPopulationDetailAPI(populationCode));
    }, []);

    return (
        <>
            <div>
                {
                    freeboard.memberCode === userMembercode.memberCode ?
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
                        <>
                            <h1>제목 : {freeboard.freeBoardTitle}</h1>
                            <h2>생성일자 : {freeboard.freeBoardCreatedAt}</h2>
                            <h3>내용 : {freeboard.freeBoardContent}</h3>
                        </>
                    )
                    :
                    (
                        <p>게시글 데이터를 불러오는 중입니다...</p>
                    )
                }
            </div>
        </>
    );
}