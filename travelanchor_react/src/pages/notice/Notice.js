import { callNoticeListAPI } from '../../apis/NoticeAPICalls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replace, useNavigate } from 'react-router-dom';
import NoticeList from './NoticeList';
import './Notice.css';
import { isLogin, findSub } from '../../utils/tokenUtils';
import { callGetMemberAPI } from "../../apis/MemberAPICalls";

export default function Notice() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notices = useSelector(state => state.noticeReducer);
    const [ loading, setLoading ] = useState(true);

    const userInfo = useSelector(state => state.memberReducer);
    const userMembercode = userInfo.data;

    console.log("userMemberCode: " , userMembercode);

    // console.log(notices);

    useEffect(() => {
            setLoading(true);
            dispatch(callNoticeListAPI());
            setLoading(false);
        },
        []
    );

    useEffect(() => {
        console.log("[Notice] Notice useEffect");

        const tokenSub = findSub();

        // console.log(tokenSub);

        if(tokenSub) {
            dispatch(callGetMemberAPI({memberId: tokenSub}));
        }

    }, []);

    // console.log("[Population] populations : ", populations);

    const onClickCreateNoticeHandler = () => {

        if(!isLogin()) {
			navigate("/login", { replace: false });
            return;
        }

        console.log("[Notice] onClickCreateNoticeHandler");
        navigate("/notice/noticeCreate");
    };

    if(loading) {
        return <div>Loading...</div>;
    } else {
    return (
        // <>
        //     <div>
        //         <button onClick={onClickCreateNoticeHandler}>공지사항 생성</button>
        //     </div>
        //     <div>
        //         {
        //             notices.length > 0 && notices.map((notice) => (<NoticeList key={ notice.noticeCode} population={ notice } />)) 
        //         }
        //     </div>
        // </>
            <div className="notice-container">
                <div className='notice-title'>공지사항</div>
            {/* 상단 헤더 */}
            {   userMembercode ? 
                (
                    <div className="notice-header">
                        <button 
                            className="notice-first-create-button" 
                            onClick={onClickCreateNoticeHandler}
                        >
                            공지사항 생성
                        </button>
                    </div>
                )
                :
                (
                    null
                )
            }

            {/* 공지사항 목록 */}
            <div className="notice-list-container">
                <div className="notice-list-header">
                    <div>순서</div>
                    <div>제목</div>
                    <div>작성자</div>
                    <div>작성일</div>
                    <div>조회수</div>
                </div>

                <div>
                    {
                        notices.length > 0 && notices.map((notice) => (<NoticeList key={ notice.noticeCode} population={ notice } />)) 
                    }
                </div>

            </div>
        </div>
    );
}}
