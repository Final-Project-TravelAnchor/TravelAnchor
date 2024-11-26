import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FreeBoard from "./FreeBoard";
import { decodeJwt } from "../../utils/tokenUtils";
import { callGetMemberAPI } from "../../apis/MemberAPICalls";
import { findSub } from "../../utils/tokenUtils";
import './FreeBoardDetail.css';
import {
    callCommentAPI,
    callCreateCommentAPI,
    callUpdateCommentAPI,
    callDeleteCommentAPI,
} from "../../apis/CommentAPICalls";
import memberReducer from "../../modules/MemberModule";

export default function FreeBoardDetail() {

    const location = useLocation();
    const freeboard = location.state;

    // console.log("freeboard: " , freeboard);

    const userInfo = useSelector(state => state.memberReducer);
    const userMembercode = userInfo.data;

    console.log("게시판작성자코드?",freeboard.memberCode);
    console.log("멤버아이디?",userMembercode);
    // console.log("현재 로그인한 멤버?",userMembercode.memberName);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const comment = useSelector(state => state.commentReducer);
    console.log("잘되냐?",comment)

    // 댓글 불러오기
    useEffect(() => {
        if (freeboard) {
            dispatch(callCommentAPI(freeboard.freeBoardCode));
        }
        console.log("프리보드코드는?", freeboard.freeBoardCode);
    }, [freeboard, dispatch]);

    // 날짜 형식
    const today = new Date().toISOString().split('T')[0];
    
    // 댓글 등록
    const [ form, setForm ] = useState({
        conmmentCode: null,
        freeBoardCode: freeboard.freeBoardCode,
        memberCode: 2,
        commentContent: "",
        commentCreatedAt: today,
    })

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleAddComment = async () => {
        console.log("댓글달기 눌렀는데?");
        await dispatch(callCreateCommentAPI(form));
        
        // 댓글 등록 후 댓글 목록 새로고침
        dispatch(callCommentAPI(freeboard.freeBoardCode));
    
        // 입력 필드 초기화
        setForm({
            ...form,
            commentContent: "",
        });
    };


    const handleUpdateComment = (commentCode, content) => {
        const updatedComment = { commentCode, content };
        dispatch(callUpdateCommentAPI(updatedComment));
    };

    // 댓글 삭제 핸들러
    const handleDeleteComment = async (deletedComment) => {
        // 댓글 삭제 API 호출
        const response = await dispatch(callDeleteCommentAPI(deletedComment));
        
        // 성공 시 새로고침
        dispatch(callCommentAPI(freeboard.freeBoardCode));

    };

    // 수정하기 버튼
    const onClickModifyModeHandler = (freeboard) => {
        console.log("[FreeBoardDetail]onClickModifyModeHandler ", freeboard);
        navigate(`/freeboard/freeboardModify/${freeboard.freeboardCode}`, { state: freeboard, replace: false });
    };

    // 뒤로가기 버튼
    const onClickBackHandler = () => {
        navigate(`/freeboard`);
    }

    // useEffect(() => {
    //     console.log("[FreeBoardDetail] freeboard useEffect");
    // }, []);

    // 댓글 목록 필터링
    const filteredComments = Object.values(comment || {}).filter(
        (comment) => comment.freeBoardCode === freeboard.freeBoardCode
    );

    console.log("필터링되냐", filteredComments);
    // console.log("댓글쓴멤버코드는?", filteredComments[0].memberCode);


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
            <div>
                {/* 댓글 목록 */}
                <h3>댓글</h3>
                <div className="comments-list">
                    {filteredComments && filteredComments.length > 0 ? (
                        filteredComments.map((commentItem) => (
                            <div className="comment-item">
                                <p>{filteredComments[0].memberCode} : </p>
                                <p>{commentItem.commentContent} {commentItem.commentCreatedAt}</p>
                                <button
                                    onClick={() => handleUpdateComment(commentItem.commentCode, "수정된 내용")}
                                >
                                    수정
                                </button>
                                <button
                                    onClick={() => handleDeleteComment(commentItem.commentCode)}
                                >
                                    삭제
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>댓글이 없습니다.</p>
                    )}
                </div>

                {/* 댓글 작성 */}
                <div className="add-comment">
                    <input
                        name="commentContent"
                        type="text"
                        value={form.commentContent}
                        onChange={onChangeHandler}
                        placeholder="댓글을 입력하세요"
                    />
                    <button onClick={handleAddComment}>댓글달기</button>
                </div>
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