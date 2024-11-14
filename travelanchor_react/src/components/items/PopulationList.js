import PopulationCSS from "./PopulationList.module.css";
import { useNavigate } from "react-router-dom";

export default function PopulationList({ population : {populationTitle, populationCode},}) {

    const navigate = useNavigate();

    const onClickPopulationHandler = (populationCode) => {
        console.log("onClickPopulationHandler");
        navigate(`/items/${populationCode}`, { replace: false});
    };

    return (
        <div 
            className={PopulationCSS.PopulationDiv}
            onClick={() => onClickPopulationHandler(populationCode)}    
        >
            <h5>{populationTitle}</h5>
        </div>
    );

}