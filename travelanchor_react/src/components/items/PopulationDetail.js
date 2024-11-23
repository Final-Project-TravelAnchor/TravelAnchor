import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callPopulationDetailAPI } from "../../apis/PopulationAPICalls";
import './PopulationDetail.css';
import { isLogin, findSub } from "../../utils/tokenUtils";
import { callGetMemberAPI } from "../../apis/MemberAPICalls";

export default function PopulationDetail() {

    const { populationCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const populationDetail = useSelector((state) => state.populationReducer);
    const memberInfo = useSelector((state) => state.memberReducer);

    const fetchPopulationAndMember = async () => {
        // 모집글 상세 API 호출
        dispatch(callPopulationDetailAPI(populationCode));

        // 사용자 정보 가져오기
        const tokenSub = findSub();
        if (tokenSub) {
            try {
                await dispatch(callGetMemberAPI({ memberId: tokenSub }));
            } catch (error) {
                console.error("Failed to fetch member data:", error);
            }
        }
    };

    useEffect(() => {
        fetchPopulationAndMember();
    }, [populationCode, dispatch]);

    const onClickModifyModeHandler = () => {
        navigate(`/items/populationModify/${populationCode}`, { state: { populationDetail }, replace: false });
    };

    const onClickInsertChatRoom = () => {
        if (!isLogin()) {
            navigate("/login", { replace: false });
            return;
        }
        navigate(`/items/chatroom/${populationCode}`, { state : memberInfo });
    };

    const onClickBackPopulationHandler = () => {
        navigate(`/items/population`);
    };

    return (
        <div className="detail-mate-container">
            <h1 className="detail-title">여행메이트 찾기</h1>
            <div className="detail-container">
                {populationDetail && (
                    <div className="detail-content">
                        <h2 className="mate-detail-title">{populationDetail.populationTitle}</h2>
                        <h2 className="detail-item">
                            <span className="detail-label">생성일자:</span> {populationDetail.populationCreatedAt}
                        </h2>
                        <h2 className="detail-item">
                            <span className="detail-label">조회수:</span> {populationDetail.populationViews}
                        </h2>
                        <h2 className="detail-item">
                            <span className="detail-label">모집인원:</span> {populationDetail.populationPeople}
                        </h2>
                        <h2 className="detail-item">
                            <span className="detail-label">내용:</span> {populationDetail.populationDescription}
                        </h2>
                        <button onClick={onClickInsertChatRoom} className="detail-chat-button">
                            채팅하기
                        </button>
                    </div>
                )}
                <div className="mate-detail-button-container">
                    {memberInfo?.memberCode === populationDetail?.memberCode && (
                        <button
                            onClick={onClickModifyModeHandler}
                            className="mate-detail-modify-button"
                        >
                            수정하기
                        </button>
                    )}
                    <button
                        onClick={onClickBackPopulationHandler}
                        className="mate-detail-back-button"
                    >
                        뒤로가기
                    </button>
                </div>
            </div>
        </div>
    );
}