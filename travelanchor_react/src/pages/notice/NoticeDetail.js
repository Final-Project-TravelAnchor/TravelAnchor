import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { callPopulationDetailAPI } from "../../apis/PopulationAPICalls";
import { useLocation } from "react-router-dom";


export default function NoticeDetail() {

    const location = useLocation();
    const notice = location.state;
    console.log(notice);

    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const population = useSelector(state => state.populationReducer)
    // const populationDetail = population.data;
    // console.log(populationDetail);

    const onClickModifyModeHandler = (notice) => {
        console.log("[NoticeDetail]onClickModifyModeHandler ", notice);
        navigate(`/notice/noticeModify/${notice.noticeCode}`, { state: notice, replace: false });
        // navigate(`/items/${populationCode}`, { replace: false});
    };

    useEffect(() => {
        console.log("[NoticeDetail] notice useEffect");
        // dispatch(callPopulationDetailAPI(populationCode));
    }, []);

    return (
        <div>
            <button onClick={() => onClickModifyModeHandler(notice)}>
                수정하기
            </button>
            {
                notice && 
                (
                    <>
                        <h1>제목 : {notice.noticeName}</h1>
                        <h2>생성일자 : {notice.noticeCreatedAt}</h2>
                        <h2>조회수 : {notice.noticeViews}</h2>
                        <h3>내용 : {notice.noticeContents}</h3>
                    </>
                )
            }
        </div>
    );
}