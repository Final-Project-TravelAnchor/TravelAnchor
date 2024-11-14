import { callPopulationListAPI } from '../../apis/PopulationAPICalls';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopulationList from '../items/PopulationList';


export default function Population() {

    const dispatch = useDispatch();
    const populations = useSelector(state => state.populationReducer);

    useEffect(
        () => {
            console.log('Mate useEffect');
            dispatch(callPopulationListAPI());
        },
        []
    );

    console.log("[Population] populations : ", populations);

    return (
        <div>
            {
                populations.length > 0 && populations.map((population) => (<PopulationList key={ population.populationCode } population={ population } />)) 
            }
        </div>
    );
}
