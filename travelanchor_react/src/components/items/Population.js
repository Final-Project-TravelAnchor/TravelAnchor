import { callPopulationListAPI } from '../../apis/PopulationAPICalls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopulationList from '../items/PopulationList';
import { replace, useNavigate } from 'react-router-dom';
import { isLogin } from '../../utils/tokenUtils';


export default function Population() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const populations = useSelector(state => state.populationReducer);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
            setLoading(true);
            // console.log('Mate useEffect');
            dispatch(callPopulationListAPI());
            setLoading(false);
        },
        []
    );

    // console.log("[Population] populations : ", populations);

    const onClickCreatePopulationHandler = () => {

        if(!isLogin()) {
			navigate("/login", { replace: false });
            return;
        }

        console.log("[Population] onClickCreatePopulationHandler");
        // navigate("/items/populationCreate", { replace: false});
        navigate("/items/populationCreate");
    };

    if(loading) {
        return <div>Loading...</div>;
    } else {
    return (
        <>
            <div>
                <button onClick={onClickCreatePopulationHandler}>모집공고 생성</button>
            </div>
            <div>
                {
                    populations.length > 0 && populations.map((population) => (<PopulationList key={ population.populationCode } population={ population } />)) 
                }
            </div>
        </>
    );
    }

}
