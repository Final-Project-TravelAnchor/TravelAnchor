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

    return (
        <div>
            { populations.map((population) => (<PopulationList key={ population.populationCode } product={ population } />)) }
        </div>
    );
}
