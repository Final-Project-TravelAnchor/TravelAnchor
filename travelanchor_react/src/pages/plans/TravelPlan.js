import { callTravelPlanListAPI, callTravelPlanDetailAPI} from "../../apis/TravelPlanAPICalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import TravelPlanList from './TravelPlanList';
import { isLogin } from '../../utils/tokenUtils';
import { useEffect, useState } from 'react';
import './TravelPlan.css';

export default function TravelPlan() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const travelPlans = useSelector(state => state.travelPlanReducer || []);
	const [ loading, setLoading ] = useState(true);


	useEffect(() => {
		const fetchTravelPlans = async () => {
			setLoading(true);
			await dispatch(callTravelPlanListAPI());
			setLoading(false);
		};

		fetchTravelPlans();
	}, [dispatch]
	);

	// console.log("TravelPlanList에 전달된 travelPlans:", travelPlans);

	const onClickCreateTravelPlanHandler = () => {
		if(!isLogin()) {
			navigate("/login", { replace: false });
            return;
        }
        console.log("[TravelPlan] onClickCreateTravelPlanHandler");
        navigate("/plans/TravelPlanCreate");
	};

	if(loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="travel-plan-container">
			<h1>나의 여행 일정</h1>
            <div className="travel-plan-list">
				{travelPlans?.length > 0 ? (
					travelPlans.map((travelPlan) => (
						<TravelPlanList key={travelPlan.travelCode} travelPlan={travelPlan} />
					))
				) : (
					<div>등록된 일정이 없습니다. 일정을 추가해보세요😊</div>
				)}
            </div>
            <div>
                <button 
				className="travel-plan-create-button"
				onClick={onClickCreateTravelPlanHandler}>+ 일정 추가하기</button>
            </div>
        </div>
    );
}