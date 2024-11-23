import { callNoticeListAPI } from '../../apis/NoticeAPICalls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NoticeList from './NoticeList';
import './Notice.css';
import { isLogin, findAuth } from '../../utils/tokenUtils';

export default function Notice() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notices = useSelector(state => state.noticeReducer || []);
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const fetchNotices = async () => {
            setLoading(true);
            await dispatch(callNoticeListAPI());
            setLoading(false);
        };

        fetchNotices();
    }, [dispatch]);

    useEffect(() => {
        const authValue = findAuth();
        setAuth(authValue);
        console.log("auth : ", authValue);
    }, []);

    const onClickCreateNoticeHandler = () => {
        if (!isLogin()) {
            navigate("/login", { replace: false });
            return;
        }
        console.log("[Notice] onClickCreateNoticeHandler");
        navigate("/notice/noticeCreate");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="notice-container">
            <div className="notice-title">공지사항</div>

            {auth === 'Admin' && (
                <div className="notice-header">
                    <button 
                        className="notice-first-create-button" 
                        onClick={onClickCreateNoticeHandler}
                    >
                        공지사항 생성
                    </button>
                </div>
            )}

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
                    {notices?.length > 0 
                        ? notices.map((notice) => (
                            <NoticeList 
                                key={notice.noticeCode} 
                                population={notice} 
                            />
                          ))
                        : <div>공지사항이 없습니다.</div>
                    }
                </div>
            </div>
        </div>
    );
}