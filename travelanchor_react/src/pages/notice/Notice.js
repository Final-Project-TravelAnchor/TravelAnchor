import { callNoticeListAPI } from '../../apis/NoticeAPICalls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replace, useNavigate } from 'react-router-dom';
import NoticeList from './NoticeList';
import './Notice.css';

export default function Notice() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notices = useSelector(state => state.noticeReducer);
    const [ loading, setLoading ] = useState(true);

    // console.log(notices);

    useEffect(() => {
            setLoading(true);
            dispatch(callNoticeListAPI());
            setLoading(false);
        },
        []
    );

    // console.log("[Population] populations : ", populations);

    const onClickCreateNoticeHandler = () => {
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
            <div className="notice-header">
                <button 
                    className="notice-first-create-button" 
                    onClick={onClickCreateNoticeHandler}
                >
                    공지사항 생성
                </button>
            </div>

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
