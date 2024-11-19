import NoticeCSS from "./NoticeList.module.css";
import { useNavigate } from "react-router-dom";

export default function NoticeList(noticeDetail) {

    const notice = noticeDetail.population;

    const navigate = useNavigate();

    const onClickNoticeHandler = (notice) => {
        console.log("onClickNoticeHandler");
        navigate(`/notice/${notice.noticeCode}`, { replace: false, state: notice});
    };

    return (
        <>
            <div 
                className={NoticeCSS.noticeDiv}
                onClick={() => onClickNoticeHandler(notice)}    
            >
                <h5>{notice.noticeCode}</h5>
                <h5>{notice.noticeName}</h5>
                <h5>{notice.noticeWriter}</h5>
                <h5>{notice.noticeCreatedAt}</h5>
                <h5>{notice.notieceViews}</h5>
            </div>
        </>
    );

}