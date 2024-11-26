import PopulationCSS from "./PopulationList.module.css";
import { useNavigate } from "react-router-dom";

export default function PopulationList( populationDetail ) {

    const population = populationDetail.population;

    console.log("populationDetail: ", populationDetail);
    console.log("population:", population);

    const navigate = useNavigate();

    const onClickPopulationHandler = (populationCode) => {
        console.log("onClickPopulationHandler");
        navigate(`/items/${populationCode}`, { replace: false, state: population });
    };

    return (
        <div 
            className={PopulationCSS.PopulationDiv}
            onClick={() => onClickPopulationHandler(population.populationCode)}    
        >
            <h5>{population.populationTitle}</h5>
            <h5>{population.populationPeople}명</h5>
            <h5>조회수 : {population.populationViews}회</h5>
        </div>
    );

}