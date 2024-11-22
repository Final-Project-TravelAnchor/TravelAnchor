import { callPopulationListAPI } from '../../apis/PopulationAPICalls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopulationList from '../items/PopulationList';
import { replace, useNavigate } from 'react-router-dom';
import './Population.css';


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
        console.log("[Population] onClickCreatePopulationHandler");
        // navigate("/items/populationCreate", { replace: false});
        navigate("/items/populationCreate");
    };

    if(loading) {
        return <div>Loading...</div>;
    } else {
    return (
        <>
            <div className="mate-container">
                <h1 className="mate-title">여행메이트 찾기</h1>
                <div className="mate-actions">
                    <button onClick={onClickCreatePopulationHandler} className="mate-create-button">
                        모집공고 생성
                    </button>
                </div>
                <div className="population-grid">
                    {populations.length > 0 ? (
                        populations.map((population) => (
                            <div key={population.populationCode} className="population-card">
                                <PopulationList population={population} />
                            </div>
                        ))
                    ) : (
                        <div className="no-population">모집공고가 없습니다.</div>
                    )}
                </div>
            </div>
        </>
    );
    }

}
