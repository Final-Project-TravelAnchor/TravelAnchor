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
            className="Population-card-content"
            onClick={() => onClickPopulationHandler(population.populationCode)}    
        >
            <h5>{population.populationTitle}</h5><br/>
            <p>모집: {population.populationPeople}명</p>
            <p>조회: {population.populationViews}회</p>
        </div>
    );

}