// import FreeBoardCSS from "./FreeBoardList.module.css";
import { useNavigate } from "react-router-dom";

export default function FreeBoardList( freeboardDetail ) {

    // console.log("[FreeBoardList] freeboardDetail", freeboardDetail);

    const freeboard = freeboardDetail.population;

    const navigate = useNavigate();

    const onClickFreeBoardHandler = (freeboard) => {
        console.log("onClickFreeBoardHandler");
        navigate(`/freeboard/${freeboard.freeBoardCode}`, { replace: false, state: freeboard });
    };

    return (
        <div 
            // className={FreeBoardCSS.freeboardDiv}
            onClick={() => onClickFreeBoardHandler(freeboard)}    
        >
            <h5>{freeboard.freeBoardTitle}</h5>
            <h5>{freeboard.freeBoardContent}</h5>
            <h5>{freeboard.freeBoardCreatedAt}</h5>
            <br/>
        </div>
    );

}