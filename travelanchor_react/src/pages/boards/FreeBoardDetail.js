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

    // 수정하기 버튼
    const onClickModifyModeHandler = (freeboard) => {
        console.log("[FreeBoardDetail]onClickModifyModeHandler ", freeboard);
        navigate(`/freeboard/freeboardModify/${freeboard.freeboardCode}`, { state: freeboard, replace: false });
    };

    // 뒤로가기 버튼
    const onClickBackHandler = () => {
        navigate(`/freeboard`);
    }

    //----------------------댓글 조회----------------------
    // 댓글 불러오기
    useEffect(() => {
        if (freeboard) {
            dispatch(callCommentAPI(freeboard.freeBoardCode));
        }
        console.log("프리보드코드는?", freeboard.freeBoardCode);
    }, [freeboard, dispatch]);

    // 댓글 목록 필터링
    const filteredComments = Object.values(comment || {}).filter(
        (comment) => comment.freeBoardCode === freeboard.freeBoardCode
    );

    console.log("필터링되냐", filteredComments);
    // console.log("댓글쓴멤버코드는?", filteredComments[0].memberCode);

    // 날짜 형식
    const today = new Date().toISOString().split('T')[0];
    
    //----------------------댓글 등록----------------------
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

    //-------------------------------댓글 수정-----------------------------
    // 수정 상태 관리
    const [editingCommentCode, setEditingCommentCode] = useState(null);
    const [editingContent, setEditingContent] = useState("");

    // 댓글 수정 시작
    const handleStartEditing = (commentCode, currentContent) => {
        setEditingCommentCode(commentCode); // 수정할 댓글 설정
        setEditingContent(currentContent); // 기존 내용을 수정 필드에 표시
    };

    // 댓글 수정 완료
const handleUpdateComment = async (commentCode) => {
    if (!editingContent.trim()) {
        alert("댓글 내용을 입력해주세요.");
        return;
    }

    // 수정할 댓글 데이터 생성
    const updatedComment = {
        commentCode, // 매개변수로 전달된 commentCode 사용
        commentContent: editingContent, // 수정된 댓글 내용
    };

    // 수정 API 호출
    await dispatch(callUpdateCommentAPI(commentCode, updatedComment)); 

    // 수정 완료 후 상태 초기화
    setEditingCommentCode(null);
    setEditingContent("");

    // 댓글 목록 새로고침
    dispatch(callCommentAPI(freeboard.freeBoardCode));
    };

    // 댓글 수정 취소
    const handleCancelEditing = () => {
        setEditingCommentCode(null);
        setEditingContent("");
    };


    //-------------------------------댓글 삭제-----------------------------
    // 댓글 삭제 핸들러
    const handleDeleteComment = async (deletedComment) => {
        // 댓글 삭제 API 호출
        const response = await dispatch(callDeleteCommentAPI(deletedComment));
        
        // 성공 시 새로고침
        dispatch(callCommentAPI(freeboard.freeBoardCode));
    };



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
            <div className="fb-comment-container">
                {/* 댓글 목록 */}
                <h3 key={comment.commentCode}>댓글</h3>
                <div className="comments-list">
            {filteredComments && filteredComments.length > 0 ? (
                filteredComments.map((commentItem) => (
                    <div className="comment-item" key={commentItem.commentCode}>
                        {editingCommentCode === commentItem.commentCode ? (
                            // 수정 중일 때 표시할 폼
                            <div>
                                <input
                                    type="text"
                                    value={editingContent}
                                    onChange={(e) => setEditingContent(e.target.value)}
                                />
                                <button onClick={() => handleUpdateComment(commentItem.commentCode)}>
                                    저장
                                </button>
                                <button onClick={handleCancelEditing}>취소</button>
                            </div>
                        ) : (
                            // 일반 댓글 표시
                            <div>
                                <p>
                                    {commentItem.memberCode}: {commentItem.commentContent}
                                </p>
                                <div className="button-container">
                                    <span className="comment-date">{commentItem.commentCreatedAt}</span>
                                    <button
                                        onClick={() =>
                                            handleStartEditing(commentItem.commentCode, commentItem.commentContent)
                                        }
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleDeleteComment(commentItem.commentCode)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        )}
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